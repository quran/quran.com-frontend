import React, { Component, PropTypes } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Link } from 'react-scroll';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentAyah } from '../../redux/modules/ayahs';

const style = require('./style.scss');

@connect(
  state => ({
    surahId: state.surahs.current
  }),
  (dispatch) => ({
    setCurrentAyah: bindActionCreators(setCurrentAyah, dispatch)
  })
)
export default class VersesDropdown extends Component {
  static propTypes = {
    ayat: PropTypes.number.isRequired,
    loadedAyahs: PropTypes.object.isRequired, // Set
    onClick: PropTypes.func.isRequired,
    isReadingMode: PropTypes.bool
  };

  static defaultProps = {
    className: 'col-md-3'
  };

  onNonScrollClick(ayahNum) {
    const { surahId, setCurrentAyah } = this.props;
    setCurrentAyah(surahId +':'+ ayahNum);
    return this.props.onClick(ayahNum);
  }

  onScrollClick(ayahNum) {
    const { surahId, setCurrentAyah } = this.props;
    setCurrentAyah(surahId +':'+ ayahNum);
  }

  renderItem(ayah, index) {
    const { loadedAyahs, isReadingMode } = this.props;
    const ayahNum = index + 1;

    if (loadedAyahs.has(ayahNum) && !isReadingMode) {
      return (
        <li key={index}>
          <Link onClick={this.onScrollClick.bind(this, ayahNum)} to={`ayah:${ayahNum}`} smooth spy offset={-120} activeClass="active" duration={500} className="pointer">
            {ayahNum}
          </Link>
        </li>
      );
    }

    return <MenuItem key={index} onClick={this.onNonScrollClick.bind(this, ayahNum)}>{ayahNum}</MenuItem>;
  }

  renderMenu() {
    const { ayat } = this.props;

    return Array(ayat).join().split(',').map(this.renderItem.bind(this));
  }

  render() {
    const { className } = this.props;

    const title = (
      <span>
        Verses
      </span>
    );

    return (
      <div className={`dropdown border-right ${className} ${style.dropdown}`}>
        <button
          className={`btn btn-link no-outline`}
          id="verses-dropdown"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          {title}
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="verses-dropdown">
          {this.renderMenu()}
        </ul>
      </div>
    );
  }
}
