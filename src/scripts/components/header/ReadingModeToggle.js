import React, { Component, PropTypes } from 'react';

const ReadingModeToggle = ({ onReadingModeToggle, isToggled }) => (
  <a
    className={`pointer nav-link toggle-icon ${isToggled && 'active'}`}
    onClick={onReadingModeToggle}>
    <i className="ss-icon ss-openbook text-align" />
    Reading: {isToggled ? 'on' : 'off'}
  </a>
);

export default ReadingModeToggle;
