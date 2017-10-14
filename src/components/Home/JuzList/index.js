import React, { Component } from 'react';
import * as customPropTypes from 'customPropTypes';
import styled from 'styled-components';
import debug from 'helpers/debug';
import RouterLink from 'react-router/lib/Link';

import { JUZ_LIST_EVENTS } from '../../../events';

const Link = styled(RouterLink)`
  display: block;
  padding: 10px 10px;

  &:hover {
    background: #f1f1f1;
  }
`;

const Item = styled.li`color: ${props => props.theme.brandPrimary};`;

const Name = styled.span`
  margin-right: 5px;
  font-size: 14px;
`;

const Arabic = styled.div`font-size: 14px;`;

const Translated = styled.div`
  font-size: 10px;
  color: #777;
`;

class JuzList extends Component {
  renderJuz(juz) {
    const { chapters } = this.props;
    const juzzChapters = Object.keys(juz.verseMapping);

    const list = juzzChapters.map(chapter =>
      <Translated className="col-md-12" key={chapter.id}>
        <Link
          to={`/${chapter}/${juz.verseMapping[chapter]}`}
          className="row"
          {...JUZ_LIST_EVENTS.CLICK.JUZ_LINK.PROPS}
        >
          <div className="col-xs-9">
            <Name>
              {chapters[chapter].nameSimple}
            </Name>

            <span className="h5">
              <small>
                {juz.verseMapping[chapter]}
              </small>
            </span>
          </div>
          <Arabic className="col-xs-3 text-left">
            <span className={`icon-surah${chapters[chapter].id}`} />
          </Arabic>

          <Translated
            className={`col-xs-10 text-uppercase ${chapters[chapter]
              .languageName}`}
          >
            <small>
              {chapters[chapter].translatedName.name}
            </small>
          </Translated>
        </Link>
      </Translated>
    );

    return (
      <div className="col-md-10">
        <div className="row">
          {list}
        </div>
      </div>
    );
  }

  render() {
    debug('component:JuzList', 'render');
    const { juzs } = this.props;

    return (
      <ul className="col-md-4 list-unstyled">
        {juzs.map(juz =>
          <Item key={juz.juzNumber}>
            <div className="col-xs-2 col-md-1 text-muted">
              {juz.juzNumber}
            </div>
            {this.renderJuz(juz)}
          </Item>
        )}
      </ul>
    );
  }
}

JuzList.propTypes = {
  chapters: customPropTypes.chapters.isRequired,
  juzs: customPropTypes.juzs.isRequired
};

export default JuzList;
