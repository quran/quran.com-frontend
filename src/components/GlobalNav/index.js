/* global window */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import LocaleSwitcher from 'components/LocaleSwitcher';

import debug from 'helpers/debug';
import { userType } from 'types';

const styles = require('./style.scss');

class GlobalNav extends Component {
  static propTypes = {
    // handleToggleSidebar: PropTypes.func.isRequired,
    leftControls: PropTypes.arrayOf(PropTypes.element),
    rightControls: PropTypes.arrayOf(PropTypes.element),
    handleSidebarToggle: PropTypes.func.isRequired,
    isStatic: PropTypes.bool.isRequired,
    user: userType
  };

  static defaultProps = {
    isStatic: false
  };

  state = {
    scrolled: false
  }

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
  }

  renderRightControls() {
    const { user, rightControls } = this.props;

    return rightControls || [
      <LocaleSwitcher />,
      <li>
        <a
          href="https://quran.zendesk.com/hc/en-us/articles/210090626-Development-help"
          target="_blank"
          rel="noopener noreferrer"
          data-metrics-event-name="IndexHeader:Link:Developer"
        >
          <LocaleFormattedMessage
            id="nav.developers"
            defaultMessage="Developers"
          />
        </a>
      </li>,
      <li>
        <a href="https://quran.zendesk.com/hc/en-us" data-metrics-event-name="IndexHeader:Link:Contact">
          <LocaleFormattedMessage
            id="nav.contactUs"
            defaultMessage="Contact Us"
          />
        </a>
      </li>,
      user ?
        <li>
          <Link to="/profile" data-metrics-event-name="IndexHeader:Link:Profile">
            {user.firstName || user.name}
          </Link>
        </li> :
        <noscript />
    ];
  }

  render() {
    const { leftControls, handleSidebarToggle, isStatic } = this.props;
    debug('component:GlobalNav', 'Render');

    return (
      <Navbar
        className={`montserrat ${this.state.scrolled && styles.scrolled}`}
        fixedTop={!isStatic}
        fluid
        static={isStatic}
      >
        <button type="button" className="navbar-toggle collapsed" onClick={handleSidebarToggle}>
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Nav className={styles.nav}>
          <li>
            <Link to="/"><i className="ss-icon ss-home" /></Link>
          </li>
          {
            leftControls &&
            leftControls.map(((control, index) => React.cloneElement(control, { key: index })))
          }
        </Nav>
        <Nav pullRight className="hidden-xs">
          {
            this.renderRightControls()
            .map(((control, index) => React.cloneElement(control, { key: index })))
          }
        </Nav>
      </Navbar>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user
  })
)(GlobalNav);
