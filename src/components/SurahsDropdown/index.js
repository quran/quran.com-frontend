import React, { Component } from 'react';
import * as customPropTypes from 'customPropTypes';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('./style.scss');

class SurahsDropdown extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.chapter.chapterNumber !== nextProps.chapter.chapterNumber;
  }

  renderList() {
    const { chapters } = this.props;

    return Object.values(chapters).map((chapter, index) => (
      <LinkContainer
        to={`/${chapter.chapterNumber}`}
        activeClass="active"
        key={`chapter-${index}`}
      >
        <MenuItem>
          <div className="row">
            <div className="col-xs-2 col-md-2">
              <span className="chapter-num">{chapter.chapterNumber}</span>
            </div>
            <div className="col-xs-7 col-md-7">
              <span className="suran-name">{chapter.nameSimple}</span>
              <br />
              <span className="chapter-meaning">
                {chapter.translatedName.name}
              </span>
            </div>
            <div
              className={`col-xs-3  col-md-3 text-right ${styles.arabicName}`}
            >
              {chapter.nameArabic}
            </div>
          </div>
        </MenuItem>
      </LinkContainer>
    ));
  }

  render() {
    const { chapter } = this.props;

    return (
      <NavDropdown
        className={styles.dropdown}
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
        {this.renderList()}
      </NavDropdown>
    );
  }
}

SurahsDropdown.propTypes = {
  chapters: customPropTypes.chapters.isRequired,
  chapter: customPropTypes.surahType.isRequired
};

export default SurahsDropdown;
