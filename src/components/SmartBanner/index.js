import React, { Component, PropTypes } from 'react';
import useragent from 'express-useragent';
import cookie from 'react-cookie';

class SmartBanner extends Component {
  static propTypes = {
    daysHidden: PropTypes.number,
    daysReminder: PropTypes.number,
    appStoreLanguage: PropTypes.string,
    button: PropTypes.string,
    storeText: PropTypes.objectOf(PropTypes.string),
    price: PropTypes.objectOf(PropTypes.string),
    force: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
  };

  static defaultProps = {
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

  state = {
    settings: {},
    deviceType: '',
    appId: ''
  };

  setSettings(forceDeviceType) {
    const agent = useragent.parse(window.navigator.userAgent);
    let deviceType = '';

    if (forceDeviceType) {
      deviceType = forceDeviceType;
    } else if (agent.isAndroid || agent.isAndroidTablet) {
      deviceType = 'android';
    } else if ((agent.isiPad || agent.isiPhone) && parseInt(agent.version, 10) < 6) {
      deviceType = 'ios';
    }

    this.setState({deviceType: deviceType});
    if (deviceType) {
      this.setSettingsForDevice(deviceType);
    }
  }

  parseAppId(metaName) {
    const meta = window.document.querySelector(`meta[name="${metaName}"]`);
    return /app-id=([^\s,]+)/.exec(meta.getAttribute('content'))[1];;
  }

  setSettingsForDevice(deviceType) {
    const mixins = {
      ios: {
        appMeta: 'apple-itunes-app',
        iconRels: ['apple-touch-icon-precomposed', 'apple-touch-icon'],
        getStoreLink: () =>
          `https://itunes.apple.com/${this.props.appStoreLanguage}/app/id`,
      },
      android: {
        appMeta: 'google-play-app',
        iconRels: ['android-touch-icon', 'apple-touch-icon-precomposed', 'apple-touch-icon'],
        getStoreLink: () =>
          'http://play.google.com/store/apps/details?id=',
      }
    };

    if (mixins[deviceType]) {
      this.setState({
        settings: mixins[deviceType],
        appId: this.parseAppId(mixins[deviceType].appMeta)
      });
    }
  }

  hide() {
    window.document.querySelector('html').classList.remove('smartbanner-show');
  }

  show() {
    window.document.querySelector('html').classList.add('smartbanner-show');
  }

  close() {
    this.hide();
    cookie.save('smartbanner-closed', 'true', {
      path: '/',
      expires: +new Date() + this.props.daysHidden * 1000 * 60 * 60 * 24,
    });
  }

  install() {
    this.hide();
    cookie.save('smartbanner-installed', 'true', {
      path: '/',
      expires: +new Date() + this.props.daysReminder * 1000 * 60 * 60 * 24,
    });
  }

  retrieveInfo() {
    const link = this.state.settings.getStoreLink() + this.state.appId;
    const inStore = `
      ${this.props.price[this.state.deviceType]} - ${this.props.storeText[this.state.deviceType]}`;
    let icon;

    for (let i = 0, max = this.state.settings.iconRels.length; i < max; i++) {
      const rel = window.document.querySelector(
        `link[rel="${this.state.settings.iconRels[i]}"]`);

      if (rel) {
        icon = rel.getAttribute('href');
        break;
      }
    }

    return {
      icon,
      link,
      inStore,
    };
  }

  componentDidMount() {
    if (__CLIENT__) {
      this.setSettings(this.props.force);
    }
  }

  render() {
    // Don't show banner when:
    // 1) if device isn't iOS or Android
    // 2) website is loaded in app,
    // 3) user dismissed banner,
    // 4) or we have no app id in meta

    if (!this.state.deviceType
      || window.navigator.standalone
      || cookie.load('smartbanner-closed')
      || cookie.load('smartbanner-installed')) {
      return null;
    }

    if (!this.state.appId) {
      return null;
    }

    this.show();

    const { icon, link, inStore } = this.retrieveInfo();
    const wrapperClassName = `smartbanner smartbanner-${this.state.deviceType}`;
    const iconStyle = {
      backgroundImage: `url(${icon})`,
    };

    return (
      <div className={wrapperClassName}>
        <div className="smartbanner-container">
          <a className="smartbanner-close" onClick={::this.close}>&times;</a>
          <span className="smartbanner-icon" style={iconStyle}></span>
          <div className="smartbanner-info">
            <div className="smartbanner-title">{this.props.title}</div>
            <div>{this.props.author}</div>
            <span>{inStore}</span>
          </div>

          <a href={link} onClick={::this.install} className="smartbanner-button">
            <span className="smartbanner-button-text">{this.props.button}</span>
          </a>
        </div>
      </div>
    );
  }
}

export default SmartBanner;
