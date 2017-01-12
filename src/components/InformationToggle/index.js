import React, { PropTypes } from 'react';

const InformationToggle = ({ isShowingSurahInfo, onToggle }) => (
  <a
    tabIndex="-1"
    className={`pointer ${isShowingSurahInfo && 'active'}`}
    onClick={() => onToggle({ isShowingSurahInfo: !isShowingSurahInfo })}
  >
    <i
      className="ss-icon ss-info"
    />
  </a>
);

InformationToggle.propTypes = {
  isShowingSurahInfo: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default InformationToggle;
