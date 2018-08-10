/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import useragent from 'express-useragent';
import toNumber from 'lodash/toNumber';
import cookie from 'react-cookie';
import StoreTextShape from '../shapes/StoreTextShape';

const appleIcon = require('../../static/images/app-banner-ios.jpg');
const androidIcon = require('../../static/images/app-banner-android.png');

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

    if (__CLIENT__) {
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

    return /app-id=([^\s,]+)/.exec(meta.getAttribute('content'))[1];
  };

  hide = () => {
    window.document.querySelector('html').classList.remove('smartbanner-show');
  };

  show = () => {
    window.document.querySelector('html').classList.add('smartbanner-show');
  };

  close() {
    const { daysHidden } = this.props;

    this.hide();

    let expireDate = new Date();
    expireDate = new Date(
      expireDate.setDate(expireDate.getDate() + daysHidden)
    );

    cookie.save('smartbanner-closed', 'true', {
      path: '/',
      expires: expireDate,
    });
  }

  install() {
    const { daysReminder } = this.props;

    let expireDate = new Date();
    expireDate = new Date(
      expireDate.setDate(expireDate.getDate() + daysReminder)
    );

    this.hide();
    cookie.save('smartbanner-installed', 'true', {
      path: '/',
      expires: expireDate,
    });
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
    const wrapperClassName = `smartbanner smartbanner-${deviceType}`;
    const iconStyle = {
      backgroundImage: `url(${icon})`,
    };

    return (
      <div className={wrapperClassName}>
        <div className="smartbanner-container">
          <button
            type="button"
            className="smartbanner-close btn btn-link"
            onClick={() => this.close()}
            data-metrics-event-name="SmartBanner:close"
          >
            <i className="fa fa-times-circle" />
          </button>
          <span className="smartbanner-icon" style={iconStyle} />
          <div className="smartbanner-info">
            <div className="smartbanner-title">{title}</div>
            <div>{author}</div>
            <span>{inStore}</span>
          </div>

          <a
            href={link}
            onClick={() => this.install()}
            className="smartbanner-button"
            data-metrics-event-name="SmartBanner:InstallAapp"
          >
            <span className="smartbanner-button-text">{button}</span>
          </a>
        </div>
      </div>
    );
  }
}

export default SmartBanner;
