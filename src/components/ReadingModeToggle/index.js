import React, { PropTypes } from 'react';

import SwitchToggle from 'components/SwitchToggle';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const ReadingModeToggle = ({ onReadingModeToggle, isToggled }) => (
  <div>
    <LocaleFormattedMessage id={'setting.reading'} defaultMessage={'Reading'}/>:{' '}
    <SwitchToggle
      checked={isToggled}
      onToggle={onReadingModeToggle}
      id="reading-mode-toggle"
      flat
    />
  </div>
);

ReadingModeToggle.propTypes = {
  onReadingModeToggle: PropTypes.func.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default ReadingModeToggle;
