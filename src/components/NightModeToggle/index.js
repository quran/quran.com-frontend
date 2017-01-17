/* global document */
import React, { Component } from 'react';

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
      <li className={this.state.isNightMode && 'active'}>
        <a
          tabIndex="-1"
          className="pointer"
          onClick={this.toggleNightMode}
        >
          <i
            className="ss-icon ss-lightbulb"
          />
        </a>
      </li>
    );
  }
}

export default NightModeToggle;
