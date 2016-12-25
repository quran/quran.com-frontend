import React, { Component, PropTypes } from "react";

import { locales, defaultLocale } from "../../config";
import cookie from 'react-cookie';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

export default class LocaleSwitcher extends Component {
  state = {
    currentLocale: defaultLocale,
  };

  componentDidMount() {
    if (__CLIENT__) {
      this.setState({currentLocale: cookie.load('currentLocale') || defaultLocale});
    }
  }

  handleLocaleClick(locale, e) {
    e.preventDefault();
    let expireDate = new Date();
    expireDate.setYear(expireDate.getFullYear()+1);

    this.setState({currentLocale: locale});

    cookie.save('currentLocale', locale, {
      path: '/',
      expires: new Date(expireDate),
    });

    window.location.reload();
  }

  renderLocaleLink(locale, native) {

    let className = "local-switch-link";
    if (locale === this.state.currentLocale) {
      className = `btn ${className} ${className}-active`;
    }

    return (
      <a key={ locale }
         className={className}
         onClick={ this.handleLocaleClick.bind(this, locale) }
         href={ `?local=${locale}` }
      >
        { locales[locale] }
      </a>
    );
  }

  render() {
    const keys = Object.keys(locales);

    return (
      <div className='local-switcher'>
        <p>
          <LocaleFormattedMessage id={'local.changeLocal'} defaultMessage={'Choose language '} />
        </p>

        { keys.map(this.renderLocaleLink, this) }
      </div>
    );
  }

}
