import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'quran-components/lib/Icon';
import Menu, { MenuItem } from 'quran-components/lib/Menu';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const GlobalSidebar = () => (
  <Menu>
    <MenuItem
      icon={<Icon type="help" />}
      href="https://quran.zendesk.com/hc/en-us"
    >
      <LocaleFormattedMessage id="nav.help" defaultMessage="Help & feedback" />
    </MenuItem>
    <MenuItem icon={<Icon type="cell" />} href="/apps">

      <LocaleFormattedMessage id="nav.mobile" defaultMessage="Mobile" />

    </MenuItem>
    <MenuItem icon={<Icon type="dollarsign" />} href="/donations">
      <LocaleFormattedMessage id="nav.contribute" defaultMessage="Contribute" />
    </MenuItem>
    <MenuItem
      icon={<Icon type="laptop" />}
      href="https://quran.zendesk.com/hc/en-us/articles/210090626-Development-help"
    >
      <LocaleFormattedMessage id="nav.developers" defaultMessage="Developers" />
    </MenuItem>
    <MenuItem icon={<Icon type="alert" />} href="http://legacy.quran.com">
      <LocaleFormattedMessage
        id="nav.legacySite"
        defaultMessage="Legacy Quran.com"
      />
    </MenuItem>
    <MenuItem divider href="https://quranicaudio.com/">
      Audio
    </MenuItem>
    <MenuItem href="http://salah.com/">
      Salah
    </MenuItem>
    <MenuItem href="http://sunnah.com/">
      Sunnah
    </MenuItem>
  </Menu>
);

GlobalSidebar.propTypes = {
  settingsModalProps: PropTypes.object, // eslint-disable-line
  children: PropTypes.node
};

export default GlobalSidebar;
