/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router/lib/Link';
import Navbar from 'react-bootstrap/lib/Navbar';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import Container from './Container';
import List from './List';
import { SIDEBAR_EVENTS } from '../../events';

const NavbarHeader = Navbar.Header;

class GlobalSidebar extends Component {
  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick.bind(this), true);
  }

  componentWillUnmount() {
    document.body.removeEventListener(
      'click',
      this.onBodyClick.bind(this),
      true
    );
  }

  onBodyClick = () => {
    const { open, handleOpen } = this.props;

    if (open) {
      return handleOpen(false);
    }

    return false;
  };

  render() {
    const { open, handleOpen, children } = this.props;

    return (
      <Container className="sidebar" open={open}>
        <Navbar static fluid>
          <NavbarHeader>
            <p // eslint-disable-line
              className="navbar-text"
              onClick={() => handleOpen(false)}
            >
              <Link to="/">
                <i className="ss-icon ss-home backToHome" />
                <LocaleFormattedMessage id="nav.title" defaultMessage="Quran" />
              </Link>
            </p>
          </NavbarHeader>
        </Navbar>
        <List>
          {children}
          <li>
            <a
              href="https://quran.zendesk.com/hc/en-us"
              {...SIDEBAR_EVENTS.CLICK.HELP_LINK.PROPS}
            >
              <i className="ss-icon ss-help vertical-align-middle" />{' '}
              <LocaleFormattedMessage
                id="nav.help"
                defaultMessage="Help & feedback"
              />
            </a>
          </li>
          <li>
            <Link to="/apps" {...SIDEBAR_EVENTS.CLICK.APPS_LINK.PROPS}>
              <i className="ss-icon ss-cell vertical-align-middle" />{' '}
              <LocaleFormattedMessage id="nav.mobile" defaultMessage="Mobile" />
            </Link>
          </li>
          <li>
            <Link
              to="/donations"
              {...SIDEBAR_EVENTS.CLICK.DONATIONS_LINK.PROPS}
            >
              <i className="ss-icon ss-dollarsign vertical-align-middle" />{' '}
              <LocaleFormattedMessage
                id="nav.contribute"
                defaultMessage="Contribute"
              />
            </Link>
          </li>
          <li>
            <a
              href="https://quran.zendesk.com/hc/en-us/articles/210090626-Development-help"
              target="_blank"
              rel="noopener noreferrer"
              {...SIDEBAR_EVENTS.CLICK.HELP_LINK.PROPS}
            >
              <i className="ss-icon ss-laptop vertical-align-middle" />{' '}
              <LocaleFormattedMessage
                id="nav.developers"
                defaultMessage="Developers"
              />
            </a>
          </li>
          <li>
            <a
              href="http://legacy.quran.com"
              {...SIDEBAR_EVENTS.CLICK.LEGACY_LINK.PROPS}
            >
              <i className="ss-icon ss-alert vertical-align-middle" />{' '}
              <LocaleFormattedMessage
                id="nav.legacySite"
                defaultMessage="Legacy Quran.com"
              />
            </a>
          </li>
          <hr />
          <li>
            <a
              href="https://quranicaudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              {...SIDEBAR_EVENTS.CLICK.QURANICAUDIO_LINK.PROPS}
            >
              Audio
            </a>
          </li>
          <li>
            <a
              href="http://salah.com/"
              target="_blank"
              rel="noopener noreferrer"
              {...SIDEBAR_EVENTS.CLICK.SALAH_LINK.PROPS}
            >
              Salah
            </a>
          </li>
          <li>
            <a
              href="http://sunnah.com/"
              target="_blank"
              rel="noopener noreferrer"
              {...SIDEBAR_EVENTS.CLICK.SUNNAH_LINK.PROPS}
            >
              Sunnah
            </a>
          </li>
        </List>
      </Container>
    );
  }
}

GlobalSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func,
  children: PropTypes.node
};

GlobalSidebar.defaultProps = {
  open: false
};

export default GlobalSidebar;
