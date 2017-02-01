import React, { Component, PropTypes } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Link } from 'react-scroll';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { surahType } from 'types';

const style = require('./style.scss');

export default class VersesDropdown extends Component {
  static propTypes = {
    ayat: PropTypes.number.isRequired,
    loadedAyahs: PropTypes.instanceOf(Set).isRequired,
    surah: surahType.isRequired, // Set
    onClick: PropTypes.func.isRequired,
    isReadingMode: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'col-md-3'
  };

  renderItem = (ayah, index) => {
    const { surah, loadedAyahs, isReadingMode, onClick } = this.props;
    const ayahNum = index + 1;

    if (loadedAyahs.has(ayahNum) && !isReadingMode) {
      return (
        <li key={index}>
          <Link
            onClick={() => onClick(ayahNum)}
            to={`ayah:${chapter.chapterNumber}:${ayahNum}`}
            smooth
            spy
            offset={-120}
            activeClass="active"
            duration={500}
            className="pointer"
          >
            {ayahNum}
          </Link>
        </li>
      );
    }

    return <MenuItem key={index} onClick={() => onClick(ayahNum)}>{ayahNum}</MenuItem>;
  }

  renderMenu() {
    const { ayat } = this.props;
    const array = Array(ayat).join().split(',');

    return array.map((ayah, index) => this.renderItem(ayah, index));
  }

  render() {
    const { className } = this.props;

    const title = (
      <LocaleFormattedMessage id={'setting.verses'} defaultMessage={'Go to verse'} />
    );

    return (
      <DropdownButton
        className={`dropdown ${className} ${style.dropdown}`}
        title={title}
        id="verses-dropdown"
      >
        {this.renderMenu()}
      </DropdownButton>
    );
  }
}
