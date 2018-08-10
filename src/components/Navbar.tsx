/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BootstrapNavbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import LocaleSwitcher from './LocaleSwitcher';

import { NAVBAR_EVENTS } from '../events';

const scrolledStyle = {
  boxShadow:
    '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)',
};

const StyledNav = styled(Nav)`
  @media (max-width: $screen-sm) {
    & > li {
      display: inline-block;
    }
  }
`;

type Props = {
  isStatic?: boolean;
  location: $TsFixMe;
  handleSidebarToggle: $TsFixMe;
};

class Navbar extends Component<Props> {
  public static propTypes = {
    handleSidebarToggle: PropTypes.func.isRequired,
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
    const { handleSidebarToggle, isStatic } = this.props;
    const { scrolled } = this.state;

    return (
      <BootstrapNavbar
        className="montserrat"
        style={scrolled ? scrolledStyle : {}}
        fixedTop={!isStatic}
        fluid
      >
        <button
          type="button"
          className="navbar-toggle collapsed"
          onClick={handleSidebarToggle}
          {...NAVBAR_EVENTS.CLICK.SIDEBAR_TOGGLE.PROPS}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <StyledNav>
          {!this.isHome() && (
            <li>
              <Link to="/" {...NAVBAR_EVENTS.CLICK.HOME_LINK.PROPS}>
                <i className="ss-icon ss-home" />
              </Link>
            </li>
          )}
          {this.isHome() && (
            <LocaleSwitcher className="visible-xs-inline-block" />
          )}
        </StyledNav>
        <Nav pullRight className="hidden-xs hidden-sm">
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
          <LocaleSwitcher key="locale" />,
        </Nav>
      </BootstrapNavbar>
    );
  }
}

export default Navbar;
