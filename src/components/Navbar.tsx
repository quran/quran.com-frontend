/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DlsNavbar from './dls/navbar/Navbar';
import Nav from './dls/navbar/Nav';
import LocaleSwitcher from './LocaleSwitcher';
import { NAVBAR_EVENTS } from '../events';
import NavLogo from '../../static/images/logo-nav.png';
import nightNavLogo from '../../static/images/logo-lg-w.png';

type Props = {
  isStatic?: boolean;
  isNightMode: boolean;
  location: $TsFixMe;
};

class Navbar extends Component<Props> {
  public static propTypes = {
    isStatic: PropTypes.bool,
    location: PropTypes.object.isRequired,
    isNightMode: PropTypes.bool
  };

  public static defaultProps = {
    isStatic: true,
  };

  state = {
    scrolled: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleNavbar, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleNavbar, true);
  }

  isHome() {
    const { location } = this.props;

    if (location) {
      return location.pathname === '/';
    }

    return true;
  }

  handleNavbar = () => {
    const { isStatic } = this.props;
    const { scrolled } = this.state;

    if (window.pageYOffset > 50) {
      if (!scrolled && !isStatic) {
        this.setState({ scrolled: true });
      }
    } else if (scrolled) {
      this.setState({ scrolled: false });
    }

    return false;
  };

  render() {
    const { isStatic, isNightMode } = this.props;
    const { scrolled } = this.state;

    return (
      <DlsNavbar className="montserrat" scrolled={scrolled} fixed={!isStatic}>
        <div className="container-fluid">
          <Nav>
            <li>
              <Link to="/">
                <img
                  alt="Brand"
                  src={ isNightMode ? nightNavLogo : NavLogo}
                  style={{ height: 18, transform: 'scale(1.75)' }}
                />
              </Link>
            </li>
            {this.isHome() && (
              <LocaleSwitcher className="visible-xs-inline-block" />
            )}
          </Nav>
          <Nav right className="hidden-xs hidden-sm">
            <li key="https://quranicaudio.com/">
              <a
                href="https://quranicaudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                {...NAVBAR_EVENTS.CLICK.QURANICAUDIO_LINK.PROPS}
              >
                Audio
              </a>
            </li>
            <li key="http://salah.com/">
              <a
                href="http://salah.com/"
                target="_blank"
                rel="noopener noreferrer"
                {...NAVBAR_EVENTS.CLICK.SALAH_LINK.PROPS}
              >
                Salah
              </a>
            </li>
            <li key="http://sunnah.com/">
              <a
                href="http://sunnah.com/"
                target="_blank"
                rel="noopener noreferrer"
                {...NAVBAR_EVENTS.CLICK.SUNNAH_LINK.PROPS}
              >
                Sunnah
              </a>
            </li>
            <LocaleSwitcher key="locale" />
          </Nav>
        </div>
      </DlsNavbar>
    );
  }
}

export default Navbar;
