import React, { Component, PropTypes } from 'react';

import SwitchToggle from '../../../components/SwitchToggle';

const ReadingModeToggle = ({ onReadingModeToggle, isToggled }) => (
  <div>
    Reading:{' '}
    <SwitchToggle checked={isToggled} onToggle={onReadingModeToggle} flat />
  </div>
);

export default ReadingModeToggle;
