/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import useragent from 'express-useragent';
import toNumber from 'lodash/toNumber';
import cookie from 'react-cookie';
import StoreTextShape from '../../shapes/StoreTextShape';

import Container from "./Container";
import Close from "./Close";
import Icon from "./Icon";
import { Button, ButtonText } from "./Button";
import { Info, Title } from "./Info";

const appleIcon = require('../../../static/images/app-banner-ios.jpg');
const androidIcon = require('../../../static/images/app-banner-android.png');

const ICONS: { [key: string]: string } = {
  apple: appleIcon,
  android: androidIcon,
};

const propTypes = {
  daysHidden: PropTypes.number,
  daysReminder: PropTypes.number,
  appStoreLanguage: PropTypes.string,
  button: PropTypes.string,
  storeText: StoreTextShape,
  price: StoreTextShape,
  force: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};

const defaultProps = {
  daysHidden: 15,
  daysReminder: 90,
  appStoreLanguage: 'us',
  button: 'View',
  storeText: {
    ios: 'On the App Store',
    android: 'In Google Play',
    windows: 'In Windows Store',
    kindle: 'In the Amazon Appstore',
  },
  price: {
    ios: 'Free',
    android: 'Free',
    windows: 'Free',
    kindle: 'Free',
  },
  force: '',
  title: '',
  author: '',
};

type Props = {
  daysHidden?: number;
  daysReminder?: number;
  appStoreLanguage?: string;
  button?: string;
  storeText?: StoreTextShape;
  price?: StoreTextShape;
  force?: string;
  title?: string;
  author?: string;
};

class SmartBanner extends Component<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    settings: {},
    deviceType: '',
    appId: '',
  };

  componentDidMount() {
    const { force } = this.props;

    if (__CLIENT__ && force) {
      this.setSettings(force);
    }
  }

  setSettings(forceDeviceType: string) {
    const agent = useragent.parse(window.navigator.userAgent);
    const osVersion = toNumber(agent.version);
    let deviceType = '';

    if (forceDeviceType) {
      deviceType = forceDeviceType;
    } else if (
      (agent.isAndroid || agent.isAndroidTablet) &&
      (agent.isChrome ? osVersion < 44 : true)
    ) {
      deviceType = 'android';
    } else if (
      (agent.isiPad || agent.isiPhone) &&
      (agent.isSafari ? osVersion < 6 : true)
    ) {
      deviceType = 'ios';
    }

    this.setState({ deviceType });
    if (deviceType) {
      this.setSettingsForDevice(deviceType);
    }
  }

  setSettingsForDevice(deviceType: string) {
    const mixins: { [key: string]: { [key: string]: string | $TsFixMe } } = {
      ios: {
        icon: 'app-banner-ios.jpg',
        appMeta: 'apple-itunes-app',
        getStoreLink: () => {
          const { appStoreLanguage } = this.props;

          return `https://itunes.apple.com/${appStoreLanguage}/app/id`;
        },
      },
      android: {
        icon: 'app-banner-android.png',
        appMeta: 'google-play-app',
        getStoreLink: () => 'http://play.google.com/store/apps/details?id=',
      },
    };

    if (mixins[deviceType]) {
      this.setState({
        settings: mixins[deviceType],
        appId: this.parseAppId(mixins[deviceType].appMeta),
      });
    }
  }

  parseAppId = (metaName: string) => {
    const meta = window.document.querySelector(`meta[name="${metaName}"]`);

    if (meta && meta.getAttribute('content')) {
      const content: $TsFixMe = meta.getAttribute('content');

      return (/app-id=([^\s,]+)/ as $TsFixMe).exec(content)[1];
    }

    return null;
  };

  hide = () => {
    if (window.document && window.document.querySelector('html')) {
      (window.document.querySelector('html') as Element).classList.remove(
        'smartbanner-show'
      );
    }
  };

  show = () => {
    if (window.document && window.document.querySelector('html')) {
      (window.document.querySelector('html') as Element).classList.add(
        'smartbanner-show'
      );
    }
  };

  close() {
    const { daysHidden } = this.props;

    if (!daysHidden) return null;

    this.hide();

    let expireDate = new Date();
    expireDate = new Date(
      expireDate.setDate(expireDate.getDate() + daysHidden)
    );

    cookie.save('smartbanner-closed', 'true', {
      path: '/',
      expires: expireDate,
    });

    return null;
  }

  install() {
    const { daysReminder } = this.props;

    if (!daysReminder) return null;

    let expireDate = new Date();
    expireDate = new Date(
      expireDate.setDate(expireDate.getDate() + daysReminder)
    );

    this.hide();
    cookie.save('smartbanner-installed', 'true', {
      path: '/',
      expires: expireDate,
    });

    return null;
  }

  retrieveInfo() {
    const { price, storeText } = this.props;
    const { deviceType, settings, appId } = this.state;

    const link = (settings as $TsFixMe).getStoreLink() + appId;
    const inStore = `
      ${(price as StoreTextShape & { [key: string]: string })[deviceType]} - ${
      (storeText as StoreTextShape & { [key: string]: string })[deviceType]
    }`;
    const icon = ICONS[deviceType];

    return {
      icon,
      link,
      inStore,
    };
  }

  render() {
    const { author, title, button } = this.props;
    const { deviceType, appId } = this.state;
    // Don't show banner when:
    // 1) if device isn't iOS or Android
    // 2) website is loaded in app,
    // 3) user dismissed banner,
    // 4) or we have no app id in meta

    if (
      !deviceType ||
      cookie.load('smartbanner-closed') ||
      cookie.load('smartbanner-installed')
    ) {
      return null;
    }

    if (!appId) {
      return null;
    }

    this.show();

    const { icon, link, inStore } = this.retrieveInfo();

    return (
      <Container className={`smartbanner ${deviceType}`}>
        <div className="wrapper">
          <Close
            type="button"
            className="btn btn-link"
            onClick={() => this.close()}
            data-metrics-event-name="SmartBanner:close"
          >
            <i className="fa fa-times-circle" />
          </Close>
          <Icon icon={icon} />
          <Info>
            <Title>{title}</Title>
            <div>{author}</div>
            <span>{inStore}</span>
          </Info>

          <Button
            href={link}
            onClick={() => this.install()}
            data-metrics-event-name="SmartBanner:InstallAapp"
          >
            <ButtonText>{button}</ButtonText>
          </Button>
        </div>
      </Container>
    );
  }
}

export default SmartBanner;
