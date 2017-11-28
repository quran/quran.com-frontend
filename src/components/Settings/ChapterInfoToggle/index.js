import React from 'react';
import PropTypes from 'prop-types';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { MenuItem } from 'quran-components/lib/Menu';

const InformationToggle = ({ isToggled, onToggle }) => (
  <MenuItem
    icon={<i className="ss-icon ss-info vertical-align-middle" />}
    onClick={() => onToggle({ isShowingSurahInfo: !isToggled })}
  >
    <LocaleFormattedMessage id="surah.info" defaultMessage="Surah Info" />
  </MenuItem>
);

InformationToggle.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default InformationToggle;
