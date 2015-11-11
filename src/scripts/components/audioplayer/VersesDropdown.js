import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import * as AudioplayerActions from 'actions/AudioplayerActions';
import classNames from 'classnames';

class VersesDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDropdownClick(e) {
    e.preventDefault();

    this.setState({
      open: !this.state.open
    });

    // When the dropdown is open, monitor clicks to close
    $(document).on('click.dropdownOpen', (event) => {
      if ($(ReactDOM.findDOMNode(this)).has(event.target).length === 0) {
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

    this.context.executeAction(AudioplayerActions.changeAyah, {
      ayah: ayah,
      shouldPlay: true
    });
  }

  ayatList() {
    var list = Array(this.props.ayahs)
    .join().split(',').map(function(e, i) {return i; });

    return list.map((i) => {
      return (
        <li key={i + 1}>
          <a onClick={this.goToAyah.bind(this, i + 1)}>{i + 1}</a>
        </li>
      );
    });
  }

  render() {
    var classes = classNames({
      dropdown: true,
      open: this.state.open
    });

    return (
      <li className={classes}>
        <a className="dropdown-toggle" onClick={this.handleDropdownClick.bind(this)}>
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
};

VersesDropdown.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

VersesDropdown.defaultProps = {
  ayahs: 0
};

export default VersesDropdown;
