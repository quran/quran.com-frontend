/* global document */
import React, { Component, PropTypes } from 'react';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

class NightModeToggle extends Component {
  static propTypes = {
    isNightMode: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
  }

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
  }

  render() {
    const { isNightMode } = this.props;

    return (
      <li className={isNightMode && 'active'}>
        <a
          tabIndex="-1"
          className="pointer"
          onClick={this.toggleNightMode}
        >
          <i
            className="ss-icon ss-lightbulb vertical-align-middle"
          />
          {' '}<LocaleFormattedMessage id="settings.nightMode" defaultMessage="Night Mode" className="visible-xs-inline-block" />
        </a>
      </li>
    );
  }
}

export default NightModeToggle;
