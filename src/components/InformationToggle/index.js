import React, { PropTypes } from 'react';

const InformationToggle = ({ isToggled, onToggle }) => (
  <li className={isToggled && 'active'}>
    <a
      tabIndex="-1"
      className="pointer"
      onClick={() => onToggle({ isShowingSurahInfo: !isToggled })}
    >
      <i
        className="ss-icon ss-info"
      />
    </a>
  </li>
);

InformationToggle.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default InformationToggle;
