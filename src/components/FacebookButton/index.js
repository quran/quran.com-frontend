import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { facebook } from 'redux/modules/auth';

import config from 'config';

@connect(
  null,
  { facebook, push }
)
export default class FacebookLogin extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    appId: PropTypes.string.isRequired,
    xfbml: PropTypes.bool,
    cookie: PropTypes.bool,
    scope: PropTypes.string,
    textButton: PropTypes.string,
    autoLoad: PropTypes.bool,
    size: PropTypes.string,
    fields: PropTypes.string,
    cssClass: PropTypes.string,
    version: PropTypes.string,
    icon: PropTypes.string,
    push: PropTypes.func,
    facebook: PropTypes.func
  };

  static defaultProps = {
    callback: () => {},
    appId: config.facebookAppId,
    textButton: 'Connect with Facebook',
    icon: 'fa-facebook',
    scope: 'email,user_location,user_photos',
    xfbml: true,
    cookie: true,
    autoLoad: false,
    size: 'md',
    fields: 'first_name,name,picture',
    cssClass: 'btn btn-facebook btn-',
    version: '2.7'
  };

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: this.props.appId,
        xfbml: this.props.xfbml,
        cookie: this.props.cookie,
        version: `v${this.props.version}`,
      });

      if (this.props.autoLoad) {
        FB.getLoginStatus(this.checkLoginState);
      }
    };

    // Load the SDK asynchronously
    (function(d, s, id) { // eslint-disable-line
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(window.document, 'script', 'facebook-jssdk')); // eslint-disable-line
  }

  responseApi = (authResponse) => {
    const { callback, facebook, push } = this.props; // eslint-disable-line no-shadow

    return FB.api('/me', { fields: this.props.fields }, (me) => {
      me.accessToken = authResponse.accessToken; // eslint-disable-line
      callback(me);

      return facebook(authResponse.accessToken).then(action => !action.error && push('/'));
    });
  };

  checkLoginState = (response) => {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.callback) {
        this.props.callback({ status: response.status });
      }
    }
  };

  handleClick = () => {
    FB.login(this.checkLoginState, { scope: this.props.scope });
  };

  render() {
    return (
      <div>
        <button
          className={`${this.props.cssClass}${this.props.size}`}
          onClick={this.handleClick}
        >
          {this.props.icon && <i className={`margin-md-right fa ${this.props.icon}`} />}
          {this.props.textButton}
        </button>
        <div id="fb-root"></div>
      </div>
    );
  }
}
