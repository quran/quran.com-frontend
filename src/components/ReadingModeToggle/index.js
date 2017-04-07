import React, { PropTypes } from 'react';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { MenuItem } from 'quran-components/lib/Menu';

const ReadingModeToggle = ({ onToggle, isToggled }) => (
  <MenuItem
    icon={<i className="ss-icon ss-openbook vertical-align-middle" />}
    onClick={() => onToggle({ isReadingMode: !isToggled })}
  >
    <LocaleFormattedMessage id="settings.reading" defaultMessage="Reading" />
  </MenuItem>
);

ReadingModeToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default ReadingModeToggle;
