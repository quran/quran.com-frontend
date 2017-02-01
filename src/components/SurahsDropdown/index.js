import React, { Component, PropTypes } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { surahType } from 'types';

const styles = require('./style.scss');

export default class SurahsDropdown extends Component {
  static propTypes = {
    chapters: PropTypes.objectOf(surahType).isRequired,
    title: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.chapters !== nextProps.chapters;
  }

  renderList() {
    const { chapters } = this.props;

    return Object.values(chapters).map((chapter, index) => (
      <LinkContainer to={`/${chapter.chapterNumber}`} activeClass="active" key={`chapter-${index}`}>
        <MenuItem>
          <div className="row">
            <div className="col-xs-2">
              <span className="chapter-num">
                {chapter.chapterNumber}
              </span>
            </div>
            <div className="col-xs-2">
              <span className="suran-name">{chapter.nameSimple}</span>
              <br />
              <span className="chapter-meaning">{chapter.nameEnglish}</span>
            </div>
            <div className={`col-xs-3 text-right ${styles.arabicName}`}>
              {chapter.nameArabic}
            </div>
          </div>
        </MenuItem>
      </LinkContainer>
    ));
  }

  render() {
    const { title } = this.props;

    return (
      <NavDropdown
        link
        className={styles.dropdown}
        id="chapters-dropdown"
        title={title || <LocaleFormattedMessage id="setting.chapters" defaultMessage="Surahs" />}
      >
        {this.renderList()}
      </NavDropdown>
    );
  }
}
