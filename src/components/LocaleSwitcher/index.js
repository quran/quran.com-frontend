/* global window */
import React, { PropTypes, Component } from 'react';
import cookie from 'react-cookie';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Menu, { MenuItem } from 'quran-components/lib/Menu';
import config from '../../config';
import Icon from 'quran-components/lib/Icon';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const { locales, defaultLocale } = config;

class LocaleSwitcher extends Component {
  state = {
    currentLocale: defaultLocale
  };

  componentDidMount() {
    if (__CLIENT__) {
      // TODO: This should be passed in as a prop!
      this.setState({
        currentLocale: cookie.load('currentLocale') || defaultLocale
      }); // eslint-disable-line
    }
  }

  handleLocaleClick(locale, e) {
    e.preventDefault();
    const expireDate = new Date();
    expireDate.setYear(expireDate.getFullYear() + 1);

    this.setState({ currentLocale: locale });

    cookie.save('currentLocale', locale, {
      path: '/',
      expires: new Date(expireDate)
    });

    window.location.reload();
  }

  renderList() {
    const keys = Object.keys(locales);

    return keys.map(key => (
      <MenuItem
        key={key}
        className={key === this.state.currentLocale && 'active'} // NOTE: if you use key `active` it will make all dropdown active
        onClick={e => this.handleLocaleClick(key, e)}
        href={`?local=${key}`}
      >
        {locales[key]}
      </MenuItem>
    ));
  }

  renderAsDropdown() {
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

  renderAsMenu() {
    return (
      <MenuItem
        icon={<Icon type="globe" />}
        menu={
          <Menu>
            {this.renderList()}
          </Menu>
        }
      >
        <LocaleFormattedMessage
          id="local.siteLocale"
          defaultMessage="Site Language"
        />
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

LocaleSwitcher.propTypes = {
  className: PropTypes.string,
  renderAs: PropTypes.string
};

LocaleSwitcher.defaultProps = {
  renderAs: 'dropdown'
};

export default LocaleSwitcher;
