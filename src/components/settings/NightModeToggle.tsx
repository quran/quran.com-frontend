/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'quran-components/lib/Menu';
import T from '../T';
import KEYS from '../../locale/keys';
import { SetSetting } from '../../redux/actions/settings';

const propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

type Props = {
  isNightMode: boolean;
  onToggle: SetSetting;
};

class NightModeToggle extends Component<Props> {
  static propTypes = propTypes;

  componentDidMount() {
    const { isNightMode } = this.props;

    if (isNightMode) {
      document.body.classList.add('night-mode');
    }
  }

  handleToggleNightMode = () => {
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
        onClick={this.handleToggleNightMode}
      >
        <T id={KEYS.SETTING_NIGHTMODE} />
      </MenuItem>
    );
  }
}

export default NightModeToggle;
