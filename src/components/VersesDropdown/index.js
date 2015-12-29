import React, { Component, PropTypes } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';

export default class VersesDropdown extends Component {
  static propTypes = {
    ayat: PropTypes.number.isRequired
  }

  renderMenu() {
    const { ayat } = this.props;

    return Array(ayat).join().split(',').map((ayah, index) => {
      return (
        <MenuItem key={index}>{index + 1}</MenuItem>
      );
    });
  }

  render() {
    const title = (
      <span>
        Verses
      </span>
    );

    return (
      <NavDropdown eventKey={3} title={title} id="verses-dropdown">
        {this.renderMenu()}
      </NavDropdown>
    );
  }
}
