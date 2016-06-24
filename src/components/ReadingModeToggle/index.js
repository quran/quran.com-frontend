import React, { PropTypes } from 'react';

import SwitchToggle from '../SwitchToggle';

const ReadingModeToggle = ({ onReadingModeToggle, isToggled }) => (
  <div>
    Reading:{' '}
    <SwitchToggle checked={isToggled} onToggle={onReadingModeToggle} flat />
  </div>
);

ReadingModeToggle.propTypes = {
  onReadingModeToggle: PropTypes.func.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default ReadingModeToggle;
