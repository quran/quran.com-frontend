/* global document */
import React, { Component } from 'react';
import { intlShape, injectIntl } from 'react-intl';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import bindTooltip from 'utils/bindTooltip';

class NightModeToggle extends Component {
  static propTypes = {
    intl: intlShape.isRequired
  };

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
    const { intl } = this.props;

    const title = intl.formatMessage({
      id: this.state.isNightMode ? 'setting.nightMode.dayTip' : 'setting.nightMode.nightTip',
      defaultMessage: this.state.isNightMode ? 'Switch to day mode' : 'switch to night mode'
    });

    return (
      <div>
        <a
          tabIndex="-1"
          title={title}
          rel="tooltip"
          className={`${this.state.isNightMode ? 'text-primary' : 'text-color'} pointer`}
          onClick={this.toggleNightMode}
        >
          <LocaleFormattedMessage id="setting.nightMode" defaultMessage="Night Mode" />
          : {' '}
          <i className="ss-icon ss-lightbulb" />
        </a>
      </div>
    );
  }
}

export default injectIntl(NightModeToggle);
