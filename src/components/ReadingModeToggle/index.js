import React, { PropTypes } from 'react';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const ReadingModeToggle = ({ onToggle, isToggled }) => (
  <li className={isToggled && 'active'}>
    <a
      tabIndex="-1"
      className="pointer"
      onClick={() => onToggle({ isReadingMode: !isToggled })}
    >
      <i
        className="ss-icon ss-openbook vertical-align-middle"
      />
      {' '}<LocaleFormattedMessage id="settings.reading" defaultMessage="Reading" className="visible-xs-inline-block" />
    </a>
  </li>
);

ReadingModeToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default ReadingModeToggle;
