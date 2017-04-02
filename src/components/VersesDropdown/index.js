import React, { Component, PropTypes } from 'react';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Link } from 'react-scroll';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { surahType } from 'types';

const styles = require('./style.scss');

export default class VersesDropdown extends Component {
  static propTypes = {
    chapter: surahType.isRequired, // Set
    onClick: PropTypes.func.isRequired,
    currentVerse: PropTypes.string,
  };

  renderList() {
    const { chapter, currentVerse } = this.props;
    const array = Array(chapter.versesCount).join().split(',');

    return array.map((verse, index) => (
      <LinkContainer to={`/${chapter.chapterNumber}/${index + 1}`} activeClass="active" key={`verse-${index + 1}`}>
        <MenuItem>
          <div className="row">
            <div className="col-xs-2 col-md-2">
              <span className="verse-num">
                {index + 1}
              </span>
            </div>
          </div>
        </MenuItem>
      </LinkContainer>
    ));
  }

  render() {
    const title = (
      <LocaleFormattedMessage id={'setting.verses'} defaultMessage={'Go to verse'} />
    );

    return (
      <NavDropdown
        link
        className={styles.dropdown}
        id="verses-dropdown"
        title={title}
      >
        {this.renderList()}
      </NavDropdown>
    );
  }
}
