import React, { Component, PropTypes } from 'react';

import SwitchToggle from 'components/SwitchToggle';

export default class NightModeToggle extends Component {
  static propTypes = {
    isNightMode: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
  };

  static defaultProps = {
    isNightMode: false
  };

  toggleNightMode = () => {
    const { isNightMode } = this.props;

    if(isNightMode)
      document.body.classList.remove('night-mode');
    else
      document.body.classList.add('night-mode');

    this.props.onToggle({isNightMode: !isNightMode});
  }

  render() {
    const { isNightMode } = this.props;

    return(
    <div>
      <a
        title={isNightMode ? "Switch to day more" : "Switch to night mode"}
        className={`${isNightMode ? 'text-primary' : 'text-color'} pointer`}
        onClick={this.toggleNightMode}
      >
        Night Mode:{' '}
        <i className="ss-icon ss-lightbulb"/>
      </a>
    </div>
    );
  }
}
