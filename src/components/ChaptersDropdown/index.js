import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import ChapterShape from '../../shapes/ChapterShape';

const Arabic = styled.div`
  direction: rtl;
  padding-right: 5px;
`;

const StyledDropdown = styled(NavDropdown)`
  .dropdown-menu {
    max-height: 400px;
    max-height: 60vh;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
`;

function ChaptersDropdown({ chapters, chapter }) {
  return (
    <StyledDropdown
      id="chapters-dropdown"
      title={
        chapter.nameSimple || (
          <LocaleFormattedMessage
            id="setting.chapters"
            defaultMessage="Surahs"
          />
        )
      }
    >
      {Object.values(chapters).map(currentChapter => (
        <LinkContainer
          to={`/${currentChapter.chapterNumber}`}
          activeClass="active"
          key={`chapter-${currentChapter.id}`}
        >
          <MenuItem>
            <div className="row">
              <div className="col-xs-2 col-md-2">
                <span className="chapter-num">
                  {currentChapter.chapterNumber}
                </span>
              </div>
              <div className="col-xs-7 col-md-7">
                <span className="suran-name">{currentChapter.nameSimple}</span>
                <br />
                <span className="chapter-meaning">
                  {currentChapter.translatedName.name}
                </span>
              </div>
              <Arabic className="col-xs-3  col-md-3 text-right">
                {currentChapter.nameArabic}
              </Arabic>
            </div>
          </MenuItem>
        </LinkContainer>
      ))}
    </StyledDropdown>
  );
}

ChaptersDropdown.propTypes = {
  chapters: PropTypes.objectOf(ChapterShape).isRequired,
  chapter: ChapterShape.isRequired,
};

export default ChaptersDropdown;
