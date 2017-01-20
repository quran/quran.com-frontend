/* global window */
import React, { PropTypes, Component } from 'react';
import cookie from 'react-cookie';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import config from '../../config';

const { locales, defaultLocale } = config;

export default class LocaleSwitcher extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  state = {
    currentLocale: defaultLocale,
  };

  componentDidMount() {
    if (__CLIENT__) {
      // TODO: This should be passed in as a prop!
      this.setState({ currentLocale: cookie.load('currentLocale') || defaultLocale }); // eslint-disable-line
    }
  }

  handleLocaleClick(locale, e) {
    e.preventDefault();
    const expireDate = new Date();
    expireDate.setYear(expireDate.getFullYear() + 1);

    this.setState({ currentLocale: locale });

    cookie.save('currentLocale', locale, {
      path: '/',
      expires: new Date(expireDate),
    });

    window.location.reload();
  }

  renderList() {
    const keys = Object.keys(locales);

    return keys.map(key => (
      <MenuItem
        key={key}
        className={key === this.state.currentLocale && 'active'} // NOTE: if you use key `active` it will make all dropdown active
        onClick={() => this.handleLocaleClick(key)}
        href={`?local=${key}`}
      >
        {locales[key]}
      </MenuItem>
    ));
  }

  render() {
    const { className } = this.props;

    return (
      <NavDropdown
        active={false}
        id="site-language-dropdown"
        className={className}
        title={locales[this.state.currentLocale]}
      >
        {this.renderList()}
      </NavDropdown>
    );
  }
}
