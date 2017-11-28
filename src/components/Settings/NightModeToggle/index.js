/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { MenuItem } from 'quran-components/lib/Menu';

class NightModeToggle extends Component {
  componentDidMount() {
    const { isNightMode } = this.props;

    if (isNightMode) {
      document.body.classList.add('night-mode');
    }
  }

  toggleNightMode = () => {
    const { isNightMode, onToggle } = this.props;

    if (isNightMode) {
      document.body.classList.remove('night-mode');
    } else {
      document.body.classList.add('night-mode');
    }

    onToggle({ isNightMode: !isNightMode });
  };

  render() {
    return (
      <MenuItem
        icon={<i className="ss-icon ss-lightbulb vertical-align-middle" />}
        onClick={this.toggleNightMode}
      >
        <LocaleFormattedMessage
          id="setting.nightMode"
          defaultMessage="Night Mode"
        />
      </MenuItem>
    );
  }
}

NightModeToggle.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default NightModeToggle;
