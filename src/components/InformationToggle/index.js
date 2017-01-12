import React, { PropTypes } from 'react';

import SwitchToggle from 'components/SwitchToggle';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const InformationToggle = ({ isShowingSurahInfo, onToggle }) => (
  <div>
    <LocaleFormattedMessage id="surah.info" defaultMessage="Surah Info" />
    <SwitchToggle
      checked={isShowingSurahInfo}
      onToggle={() => onToggle({ isShowingSurahInfo: !isShowingSurahInfo })}
      id="info-toggle"
      flat
    />
  </div>
);

InformationToggle.propTypes = {
  isShowingSurahInfo: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default InformationToggle;
