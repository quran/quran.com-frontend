import React, { PropTypes } from 'react';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const InformationToggle = ({ isToggled, onToggle }) => (
  <li className={isToggled && 'active'}>
    <a
      tabIndex="-1"
      className="pointer"
      onClick={() => onToggle({ isShowingSurahInfo: !isToggled })}
    >
      <i
        className="ss-icon ss-info vertical-align-middle"
      />
      {' '}<LocaleFormattedMessage id="surah.info" defaultMessage="Surah Info" className="visible-xs-inline-block" />
    </a>
  </li>
);

InformationToggle.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default InformationToggle;
