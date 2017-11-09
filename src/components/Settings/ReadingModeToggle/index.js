import React from 'react';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { MenuItem } from 'quran-components/lib/Menu';
import PropTypes from 'prop-types';

const ReadingModeToggle = ({ onToggle, isToggled }) => (
  <MenuItem
    icon={<i className="ss-icon ss-openbook vertical-align-middle" />}
    onClick={() => onToggle({ isReadingMode: !isToggled })}
  >
    <LocaleFormattedMessage
      id="setting.reading"
      defaultMessage="Reading Mode"
    />
  </MenuItem>
);

ReadingModeToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default ReadingModeToggle;
