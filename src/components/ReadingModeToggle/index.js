import React, { PropTypes } from 'react';

const ReadingModeToggle = ({ onToggle, isToggled }) => (
  <li className={isToggled && 'active'}>
    <a
      tabIndex="-1"
      className="pointer"
      onClick={() => onToggle({ isReadingMode: !isToggled })}
    >
      <i
        className="ss-icon ss-openbook"
      />
    </a>
  </li>
);

ReadingModeToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default ReadingModeToggle;
