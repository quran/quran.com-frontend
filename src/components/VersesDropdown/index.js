import React, { Component, PropTypes } from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Link } from 'react-scroll';

const style = require('./style.scss');

export default class VersesDropdown extends Component {
  static propTypes = {
    ayat: PropTypes.number.isRequired,
    loadedAyahs: PropTypes.object.isRequired, // Set
    onClick: PropTypes.func.isRequired,
    isReadingMode: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'col-md-3'
  };

  renderItem = (ayah, index) => {
    const { loadedAyahs, isReadingMode, onClick } = this.props;
    const ayahNum = index + 1;

    if (loadedAyahs.has(ayahNum) && !isReadingMode) {
      return (
        <li key={index}>
          <Link
            onClick={() => onClick(ayahNum)}
            to={`ayah:${ayahNum}`}
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
      <span>
        Verses
      </span>
    );

    return (
      <div className={`dropdown ${className} ${style.dropdown}`}>
        <button
          className="btn btn-link no-outline"
          id="verses-dropdown"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {title}
          <span className="caret" />
        </button>
        <ul className="dropdown-menu" aria-labelledby="verses-dropdown">
          {this.renderMenu()}
        </ul>
      </div>
    );
  }
}
