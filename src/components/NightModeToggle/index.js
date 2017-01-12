/* global document */
import React, { Component } from 'react';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import SwitchToggle from 'components/SwitchToggle';

import bindTooltip from 'utils/bindTooltip';

class NightModeToggle extends Component {
  state = {
    isNightMode: false,
  };

  componentDidUpdate() {
    bindTooltip();
  }

  toggleNightMode = () => {
    document.body.classList.toggle('night-mode');

    this.setState({ isNightMode: !this.state.isNightMode });
  }

  render() {
    return (
      <div>
        <LocaleFormattedMessage id="setting.nightMode" defaultMessage="Night Mode" />
        <SwitchToggle
          checked={this.state.isNightMode}
          onToggle={this.toggleNightMode}
          id="night-mode-toggle"
          flat
        />
      </div>
    );
  }
}

export default NightModeToggle;
