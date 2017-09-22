/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import useragent from 'express-useragent';
import cookie from 'react-cookie';

class SmartBanner extends Component {
  state = {
    settings: {},
    deviceType: '',
    appId: ''
  };

  componentDidMount() {
    if (__CLIENT__) {
      this.setSettings(this.props.force);
    }
  }

  setSettings(forceDeviceType) {
    const agent = useragent.parse(window.navigator.userAgent);
    let deviceType = '';
    const osVersion = parseInt(agent.version, 10);

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

  setSettingsForDevice(deviceType) {
    const mixins = {
      ios: {
        icon: 'app-banner-ios.jpg',
        appMeta: 'apple-itunes-app',
        getStoreLink: () =>
          `https://itunes.apple.com/${this.props.appStoreLanguage}/app/id`
      },
      android: {
        icon: 'app-banner-android.png',
        appMeta: 'google-play-app',
        getStoreLink: () => 'http://play.google.com/store/apps/details?id='
      }
    };

    if (mixins[deviceType]) {
      this.setState({
        settings: mixins[deviceType],
        appId: this.parseAppId(mixins[deviceType].appMeta)
      });
    }
  }

  parseAppId = (metaName) => {
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
    this.hide();

    let expireDate = new Date();
    expireDate = new Date(
      expireDate.setDate(expireDate.getDate() + this.props.daysHidden)
    );

    cookie.save('smartbanner-closed', 'true', {
      path: '/',
      expires: expireDate
    });
  }

  install() {
    let expireDate = new Date();
    expireDate = new Date(
      expireDate.setDate(expireDate.getDate() + this.props.daysReminder)
    );

    this.hide();
    cookie.save('smartbanner-installed', 'true', {
      path: '/',
      expires: expireDate
    });
  }

  retrieveInfo() {
    const link = this.state.settings.getStoreLink() + this.state.appId;
    const inStore = `
      ${this.props.price[this.state.deviceType]} - ${this.props.storeText[this.state.deviceType]}`;
    const icon = require(`../../../static/images/${this.state.settings.icon}`); // eslint-disable-line

    return {
      icon,
      link,
      inStore
    };
  }

  render() {
    // Don't show banner when:
    // 1) if device isn't iOS or Android
    // 2) website is loaded in app,
    // 3) user dismissed banner,
    // 4) or we have no app id in meta

    if (
      !this.state.deviceType ||
      window.navigator.standalone ||
      cookie.load('smartbanner-closed') ||
      cookie.load('smartbanner-installed')
    ) {
      return null;
    }

    if (!this.state.appId) {
      return null;
    }

    this.show();

    const { icon, link, inStore } = this.retrieveInfo();
    const wrapperClassName = `smartbanner smartbanner-${this.state.deviceType}`;
    const iconStyle = {
      backgroundImage: `url(${icon})`
    };

    return (
      <div className={wrapperClassName}>
        <div className="smartbanner-container">
          <a
            tabIndex="-1"
            className="smartbanner-close"
            onClick={() => this.close()}
            data-metrics-event-name="SmartBanner:close"
          >
            <i className="fa fa-times-circle" />
          </a>
          <span className="smartbanner-icon" style={iconStyle} />
          <div className="smartbanner-info">
            <div className="smartbanner-title">{this.props.title}</div>
            <div>{this.props.author}</div>
            <span>{inStore}</span>
          </div>

          <a
            href={link}
            onClick={() => this.install()}
            className="smartbanner-button"
            data-metrics-event-name="SmartBanner:InstallAapp"
          >
            <span className="smartbanner-button-text">{this.props.button}</span>
          </a>
        </div>
      </div>
    );
  }
}

SmartBanner.propTypes = {
  daysHidden: PropTypes.number,
  daysReminder: PropTypes.number,
  appStoreLanguage: PropTypes.string,
  button: PropTypes.string,
  storeText: customPropTypes.storeText,
  price: customPropTypes.storeText,
  force: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string
};

SmartBanner.defaultProps = {
  daysHidden: 15,
  daysReminder: 90,
  appStoreLanguage: 'us',
  button: 'View',
  storeText: {
    ios: 'On the App Store',
    android: 'In Google Play',
    windows: 'In Windows Store',
    kindle: 'In the Amazon Appstore'
  },
  price: {
    ios: 'Free',
    android: 'Free',
    windows: 'Free',
    kindle: 'Free'
  },
  force: '',
  title: '',
  author: ''
};

export default SmartBanner;
