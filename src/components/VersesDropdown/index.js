import React, { Component, PropTypes } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-scroll';

const style = require('./style.scss');

export default class VersesDropdown extends Component {
  static propTypes = {
    ayat: PropTypes.number.isRequired,
    loaded: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  }

  onNonScrollClick(index) {
    return this.props.onClick(index);
  }

  renderItem(ayah, index) {
    const { loaded } = this.props;

    if (loaded.includes(index)) {
      return (
        <li key={index}>
          <Link to={`ayah:${index}`} smooth offset={50} duration={500} className="pointer">
            {index + 1}
          </Link>
        </li>
      );
    }

    return <MenuItem key={index} onClick={this.onNonScrollClick.bind(this, index + 1)}>{index + 1}</MenuItem>;
  }

  renderMenu() {
    const { ayat } = this.props;

    return Array(ayat).join().split(',').map(this.renderItem.bind(this));
  }

  render() {
    const title = (
      <span>
        Verses
      </span>
    );

    return (
      <NavDropdown eventKey={3} title={title} id="verses-dropdown" className={`${style.dropdown} bordered`}>
        {this.renderMenu()}
      </NavDropdown>
    );
  }
}
