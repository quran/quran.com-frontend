/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookie';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Menu, { MenuItem } from 'quran-components/lib/Menu';

import Icon from 'quran-components/lib/Icon';
import T, { KEYS } from './T';

import config from '../../config';
import { NAVBAR_EVENTS } from '../events';

type State = {
  currentLocale: string;
};

type Props = {
  className?: string;
  renderAs?: string;
};

const propTypes = {
  className: PropTypes.string,
  renderAs: PropTypes.string,
};

const defaultProps = {
  className: '',
  renderAs: 'dropdown',
};

class LocaleSwitcher extends Component<Props> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

  readonly state: State = {
    currentLocale: config('defaultLocale'),
  };

  componentDidMount() {
    if (__CLIENT__) {
      // TODO: This should be passed in as a prop!
      this.setState({
        currentLocale: cookie.load('currentLocale') || config('defaultLocale'),
      });
    }
  }

  handleLocaleClick(locale: string) {
    const expireDate = new Date();

    expireDate.setFullYear(expireDate.getFullYear() + 1);

    this.setState({ currentLocale: locale });

    cookie.save('currentLocale', locale, {
      path: '/',
      expires: new Date(expireDate),
    });

    window.location.reload();
  }

  renderList() {
    const { currentLocale } = this.state;
    const keys = Object.keys(config('locales'));

    return keys.map(key => (
      <MenuItem
        key={key}
        className={key === currentLocale && 'active'} // NOTE: if you use key `active` it will make all dropdown active
        onClick={() => this.handleLocaleClick(key)}
        href={`?local=${key}`}
      >
        {config('locales')[key]}
      </MenuItem>
    ));
  }

  renderAsDropdown() {
    const { className } = this.props;
    const { currentLocale } = this.state;

    return (
      <NavDropdown
        active={false}
        id="site-language-dropdown"
        className={className || 'locale-switcher'}
        title={config('locales')[currentLocale]}
        {...NAVBAR_EVENTS.CLICK.LOCALE_SWITCHER_TOGGLE.PROPS}
      >
        {this.renderList()}
      </NavDropdown>
    );
  }

  renderAsMenu() {
    return (
      <MenuItem
        icon={<Icon type="globe" />}
        menu={<Menu>{this.renderList()}</Menu>}
      >
        <T id={KEYS.LOCAL_SITELOCALE} />
      </MenuItem>
    );
  }

  render() {
    const { renderAs } = this.props;

    if (renderAs === 'dropdown') {
      return this.renderAsDropdown();
    }

    return this.renderAsMenu();
  }
}

export default LocaleSwitcher;
