/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import LocaleSwitcher from 'components/LocaleSwitcher';

import debug from 'helpers/debug';
import { NAVBAR_EVENTS } from '../../events';

const scrolledStyle = {
  boxShadow:
    '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)'
};

const StyledNav = styled(Nav)`
  @media (max-width: ${props => props.theme.screen.sm}px) {
    & > li {
      display: inline-block !important;
      i[class*="ss-settings"] ~ span {
        display: none;
      }
      a {
        padding: 10px !important;
      }
    }
  }
`;

class GlobalNav extends Component {
  state = {
    scrolled: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleNavbar, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleNavbar, true);
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

  isHome() {
    if (this.props.location) {
      return this.props.location.pathname === '/';
    }

    return true;
  }

  renderRightControls() {
    const { rightControls } = this.props;

    return (
      rightControls || [
        <li>
          <a
            href="https://quranicaudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            {...NAVBAR_EVENTS.CLICK.QURANICAUDIO_LINK.PROPS}
          >
            Audio
          </a>
        </li>,
        <li>
          <a
            href="http://salah.com/"
            target="_blank"
            rel="noopener noreferrer"
            {...NAVBAR_EVENTS.CLICK.SALAH_LINK.PROPS}
          >
            Salah
          </a>
        </li>,
        <li>
          <a
            href="http://sunnah.com/"
            target="_blank"
            rel="noopener noreferrer"
            {...NAVBAR_EVENTS.CLICK.SUNNAH_LINK.PROPS}
          >
            Sunnah
          </a>
        </li>,
        <LocaleSwitcher />
      ]
    );
  }

  render() {
    const { leftControls, handleSidebarToggle, isStatic } = this.props;
    debug('component:GlobalNav', 'Render');

    return (
      <Navbar
        className="montserrat"
        style={this.state.scrolled ? scrolledStyle : {}}
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
          {leftControls &&
            leftControls.map((control, index) =>
              React.cloneElement(control, { key: index })
            )}
        </StyledNav>
        <Nav pullRight className="hidden-xs hidden-sm">
          {this.renderRightControls().map((control, index) =>
            React.cloneElement(control, { key: index })
          )}
        </Nav>
      </Navbar>
    );
  }
}

GlobalNav.propTypes = {
  // handleToggleSidebar: PropTypes.func.isRequired,
  leftControls: PropTypes.arrayOf(PropTypes.element),
  rightControls: PropTypes.arrayOf(PropTypes.element),
  handleSidebarToggle: PropTypes.func.isRequired,
  isStatic: PropTypes.bool.isRequired,
  location: customPropTypes.location
};

GlobalNav.defaultProps = {
  isStatic: false
};

export default GlobalNav;
