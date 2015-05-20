'use strict';

import React from 'react';
import $ from 'jquery';
import AudioplayerActions from 'actions/AudioplayerActions'

class VersesDropdown extends React.Component {
  constructor() {
    this.state = {
      open: false
    }
  }

  handleDropdownClick(e) {
    e.preventDefault();

    this.setState({
      open: !this.state.open
    });

    // When the dropdown is open, monitor clicks to close
    $(document).on('click.dropdownOpen', (e) => {
      if ($(React.findDOMNode(this)).has(e.target).length === 0) {
        this.setState({
          open: false
        });
        $(document).off('click.dropdownOpen');
      }
    });
  }

  goToAyah(ayah, e) {
    e.preventDefault();
    this.setState({
        open: false
    });
    // AudioplayerActions.changeAyah(this.context.dispatcher, ayah);
  }

  ayatList() {
    var list = Array(this.props.ayahs)
                .join().split(',').map(function(e, i) {return i;});

    return list.map((i) => {
      return (
        <li key={i+1}>
          <a href onClick={this.goToAyah.bind(this, i + 1)}>{i + 1}</a>
        </li>
      );
    });
  }

  render() {
    var classes = React.addons.classSet({
      dropdown: true,
      open: this.state.open
    });

    return (
      <li className={classes}>
        <a href className="dropdown-toggle" onClick={this.handleDropdownClick.bind(this)}>
          <ul className="verses">
            <li className="verses-title">Verses</li>
            <li className="verses-number">{this.props.currentAyah}</li>
          </ul>
        </a>
        <ul className="verses-dropdown dropdown-menu dropdown-menu-arrow-left">
          {this.ayatList()}
        </ul>
      </li>
    );
  }

}

VersesDropdown.propTypes = {
  ayahs: React.PropTypes.number
}

VersesDropdown.defaultProps = {
  ayahs: 0
}

export default VersesDropdown;
