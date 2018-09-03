/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DlsNavbar from './dls/navbar/Navbar';
import Nav from './dls/navbar/Nav';
import LocaleSwitcher from './LocaleSwitcher';
import { NAVBAR_EVENTS } from '../events';
import NavLogo from '../../static/images/logo-nav.png';
import NavItem from './dls/navbar/NavItem';

const scrolledStyle = {
  boxShadow:
    '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)',
};

type Props = {
  isStatic?: boolean;
  location: $TsFixMe;
};

class Navbar extends Component<Props> {
  public static propTypes = {
    isStatic: PropTypes.bool,
    location: PropTypes.object.isRequired,
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
    const { isStatic } = this.props;
    const { scrolled } = this.state;

    return (
      <DlsNavbar
        className="montserrat"
        style={scrolled ? scrolledStyle : {}}
        fixedTop={!isStatic}
        fluid
      >
        <NavItem className="navbar-brand" to="/">
          <img alt="Brand" src={NavLogo} style={{ height: 30 }} />
        </NavItem>
        <Nav>
          {this.isHome() && (
            <LocaleSwitcher className="visible-xs-inline-block" />
          )}
        </Nav>
        <Nav right className="hidden-xs hidden-sm">
          <NavItem key="https://quranicaudio.com/">
            <a
              href="https://quranicaudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              {...NAVBAR_EVENTS.CLICK.QURANICAUDIO_LINK.PROPS}
            >
              Audio
            </a>
          </NavItem>
          <NavItem key="http://salah.com/">
            <a
              href="http://salah.com/"
              target="_blank"
              rel="noopener noreferrer"
              {...NAVBAR_EVENTS.CLICK.SALAH_LINK.PROPS}
            >
              Salah
            </a>
          </NavItem>
          <NavItem key="http://sunnah.com/">
            <a
              href="http://sunnah.com/"
              target="_blank"
              rel="noopener noreferrer"
              {...NAVBAR_EVENTS.CLICK.SUNNAH_LINK.PROPS}
            >
              Sunnah
            </a>
          </NavItem>
          <LocaleSwitcher key="locale" />,
        </Nav>
      </DlsNavbar>
    );
  }
}

export default Navbar;
