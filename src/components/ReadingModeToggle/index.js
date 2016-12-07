import React, { PropTypes } from 'react';

import SwitchToggle from 'components/SwitchToggle';

const ReadingModeToggle = ({ onReadingModeToggle, isToggled }) => (
  <div>
    Reading:{' '}
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
