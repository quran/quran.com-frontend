/* global document */
import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import Navbar from 'react-bootstrap/lib/Navbar';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('./style.scss');

const NavbarHeader = Navbar.Header;

const List = styled.ul`
  padding-left: 0;

  li {
    color: #777;

    a {
      color: #777;
      padding: 10px 15px;
      display: block;

      .ss-icon {
        font-size: 18px;
        margin-right: 20px;
      }

      &:hover {
        background: #f5f5f5;
        color: #333;
      }
    }
  }
`;

class GlobalSidebar extends Component {
  state = {
    settingsModalOpen: false
  };

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
      <div className={`${styles.container} sidebar ${open && styles.open}`}>
        <Navbar static fluid>
          <NavbarHeader>
            <p // eslint-disable-line
              className="navbar-text"
              onClick={() => handleOpen(false)}
            >
              <Link to="/">
                <i className={`ss-icon ss-home ${styles.backToHome}`} />
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
              data-metrics-event-name="Sidebar:Link:Help"
            >
              <i className="ss-icon ss-help vertical-align-middle" />{' '}
              <LocaleFormattedMessage
                id="nav.help"
                defaultMessage="Help & feedback"
              />
            </a>
          </li>
          <li>
            <Link to="/apps" data-metrics-event-name="Sidebar:Link:Mobile">
              <i className="ss-icon ss-cell vertical-align-middle" />{' '}
              <LocaleFormattedMessage id="nav.mobile" defaultMessage="Mobile" />
            </Link>
          </li>
          <li>
            <Link
              to="/donations"
              data-metrics-event-name="Sidebar:Link:Contribute"
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
              data-metrics-event-name="IndexHeader:Link:Developer"
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
              data-metrics-event-name="Sidebar:Link:Legacy"
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
              data-metrics-event-name="Sites:Audio"
            >
              Audio
            </a>
          </li>
          <li>
            <a
              href="http://salah.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-metrics-event-name="Sites:Salah"
            >
              Salah
            </a>
          </li>
          <li>
            <a
              href="http://sunnah.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-metrics-event-name="Sites:Sunnah"
            >
              Sunnah
            </a>
          </li>
        </List>
      </div>
    );
  }
}

GlobalSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func,
  settingsModalProps: PropTypes.object, // eslint-disable-line
  children: PropTypes.node
};

GlobalSidebar.defaultProps = {
  open: false
};

export default GlobalSidebar;
