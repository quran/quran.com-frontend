import React from 'react';
import styled from 'styled-components';
import * as customPropTypes from 'customPropTypes';
import Link from 'react-router/lib/Link';

const Item = styled.li`
  color: ${props => props.theme.brandPrimary};

  &:hover {
    background: #f1f1f1;
  }
`;

const Arabic = styled.div`font-size: 14px;`;

const Translated = styled.div`
  font-size: 10px;
  color: #777;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px 10px;
`;

const SurahsList = props => (
  <ul className="col-md-4 list-unstyled">
    {props.chapters.map(chapter => (
      <Item key={chapter.id}>
        <StyledLink to={`/${chapter.id}`} className="row">
          <div className="col-xs-2 text-muted">{chapter.chapterNumber}</div>
          <div className="col-xs-7">{chapter.nameSimple}</div>
          <Arabic className="col-xs-3 text-left">
            <span className={`icon-surah${chapter.id}`} />
          </Arabic>

          <Translated className="col-xs-10 col-xs-offset-2">
            <span
              className={`text-uppercase ${chapter.translatedName
                .languageName}`}
            >
              {chapter.translatedName.name}
            </span>
          </Translated>
        </StyledLink>
      </Item>
    ))}
  </ul>
);

SurahsList.propTypes = {
  chapters: customPropTypes.chapters.isRequired
};

export default SurahsList;
