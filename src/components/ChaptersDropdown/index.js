import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import * as customPropTypes from 'customPropTypes';

const Arabic = styled.div`
  direction: rtl;
  padding-right: 5px;
`;

const StyledDropdown = styled(NavDropdown)`
  .dropdown-menu {
    max-height: 400px;
    max-height: 60vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

class ChaptersDropdown extends Component {
  /*
  render() {
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
      {Object.values ( chapters ).map ( currentChapter => (
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
                <br/>
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
      ) )}
    </StyledDropdown>
  };
  */

  renderItem = (_chapter) => {
    const { onClick, chapter } = this.props;

    return (
      <MenuItem
        active={_chapter.id === chapter.id}
        key={`chapter-${_chapter.id}`}
        onClick={() => onClick(_chapter.id)}
      >
        <div className="row">
          <div className="col-xs-2 col-md-2">
            <span className="chapter-num">{_chapter.chapterNumber}</span>
          </div>
          <div className="col-xs-7 col-md-7">
            <span className="suran-name">{_chapter.nameSimple}</span>
            <br />
            <span className="chapter-meaning">
              {_chapter.translatedName.name}
            </span>
          </div>
          <Arabic className="col-xs-3  col-md-3 text-right">
            {_chapter.nameArabic}
          </Arabic>
        </div>
      </MenuItem>
    );
  };

  renderMenu() {
    const { chapters } = this.props;

    return Object.values(chapters).map(chapter => this.renderItem(chapter));
  }

  render() {
    const { chapter } = this.props;

    if (!chapter) {
      return <b>Loading</b>;
    }

    const title = chapter.nameSimple || (
      <LocaleFormattedMessage
        id={'setting.chapters'}
        defaultMessage={'Surahs'}
      />
    );

    return (
      <StyledDropdown
        className={'dropdown'}
        id="chapters-dropdown"
        title={title}
      >
        {this.renderMenu()}
      </StyledDropdown>
    );
  }
}

ChaptersDropdown.propTypes = {
  chapters: PropTypes.arrayOf(customPropTypes.chapterType.isRequired)
    .isRequired,
  chapter: customPropTypes.chapterType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChaptersDropdown;
