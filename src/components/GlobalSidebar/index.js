/* global document */
import React, { PropTypes, Component } from 'react';
import Link from 'react-router/lib/Link';
import Navbar from 'react-bootstrap/lib/Navbar';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import SettingsModal from 'components/SettingsModal';

const styles = require('./style.scss');

const NavbarHeader = Navbar.Header;

class GlobalSidebar extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func,
    settingsModalProps: PropTypes.object, // eslint-disable-line
    children: PropTypes.node
  };

  static defaultProps = {
    open: false
  };

  state = {
    settingsModalOpen: false
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick.bind(this), true);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onBodyClick.bind(this), true);
  }

  onBodyClick = () => {
    const { open, handleOpen } = this.props;

    if (open) {
      return handleOpen(false);
    }

    return false;
  }

  render() {
    const { open, handleOpen, settingsModalProps, children } = this.props;

    return (
      <div
        className={`${styles.container} sidebar ${open && styles.open}`}
      >
        <Navbar static fluid>
          <NavbarHeader>
            <p // eslint-disable-line
              className="navbar-text"
              onClick={() => handleOpen(false)}
            ><Link to="/"><i className={`ss-icon ss-home ${styles.backToHome}`} /><LocaleFormattedMessage id="nav.title" defaultMessage="Quran" /></Link>
            </p>
          </NavbarHeader>
        </Navbar>
        <ul className={styles.list}>
          {children}
          <li>
            <a tabIndex="-1" className="pointer" onClick={() => this.setState({ settingsModalOpen: true }, handleOpen(false))}>
              <i className="ss-icon ss-settings vertical-align-middle" />{' '}
              <LocaleFormattedMessage id="nav.settings" defaultMessage="Settings" />
            </a>
          </li>
          <li>
            <a href="https://quran.zendesk.com/hc/en-us" data-metrics-event-name="Sidebar:Link:Help">
              <i className="ss-icon ss-help vertical-align-middle" />{' '}
              <LocaleFormattedMessage
                id="nav.help"
                defaultMessage="Help & feedback"
              />
            </a>
          </li>
          <hr />
          <li>
            <Link to="/apps" data-metrics-event-name="Sidebar:Link:Mobile">
              <i className="ss-icon ss-cell vertical-align-middle" />{' '}
              <LocaleFormattedMessage
                id="nav.mobile"
                defaultMessage="Mobile"
              />
            </Link>
          </li>
          <li>
            <Link to="/donations" data-metrics-event-name="Sidebar:Link:Contribute">
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
            <a href="http://legacy.quran.com" data-metrics-event-name="Sidebar:Link:Legacy">
              <i className="ss-icon ss-alert vertical-align-middle" />{' '}
              <LocaleFormattedMessage
                id="nav.legacySite"
                defaultMessage="Legacy Quran.com"
              />
            </a>
          </li>
        </ul>
        <SettingsModal
          {...settingsModalProps}
          open={this.state.settingsModalOpen}
          handleHide={() => this.setState({ settingsModalOpen: false })}
        />
      </div>
    );
  }
}

export default GlobalSidebar;
