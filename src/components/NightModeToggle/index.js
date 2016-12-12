import React, { Component, PropTypes } from 'react';

import SwitchToggle from 'components/SwitchToggle';

export default class NightModeToggle extends Component {
  static propTypes = {
    isToggled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isToggled: false
  };

  toggleNightMode = () => {
    if(document.body.classList.contains('night-mode'))
      document.body.classList.remove('night-mode');
    else
      document.body.classList.add('night-mode');
  }

  render() {
    const { isToggled } = this.props;

    return(
    <div>
      Night Mode:{' '}
      <SwitchToggle
        checked={isToggled}
        onToggle={this.toggleNightMode}
        id="night-mode-toggle"
        flat
      />
    </div>
    );
  }
}
