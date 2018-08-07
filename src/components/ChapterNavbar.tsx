/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BootstrapNavbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import Drawer from 'quran-components/lib/Drawer';

import ChaptersDropdown from './ChaptersDropdown';
import VersesDropdown from './VersesDropdown';

import { NAVBAR_EVENTS } from '../events';
import { SettingsShape, VerseShape, ChapterShape } from '../shapes';
import T, { KEYS } from './T';

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

const propTypes = {
  handleSidebarToggle: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  settings: SettingsShape.isRequired,
  verses: PropTypes.shape({
    verseKey: VerseShape,
  }).isRequired,
  chapters: PropTypes.shape({
    chapterId: ChapterShape,
  }).isRequired,
  chapter: ChapterShape.isRequired,
  setCurrentVerse: PropTypes.func.isRequired,
};

type Props = {
  isStatic?: boolean;
  location: $TsFixMe;
  handleSidebarToggle: $TsFixMe;
  settings: SettingsShape;
  verses?: { [verseKey: string]: VerseShape };
  chapters?: { [chapterId: string]: ChapterShape };
  chapter?: ChapterShape;
};

type State = {
  scrolled: boolean;
  drawerOpen: boolean;
};

class Navbar extends Component<Props, State> {
  public static propTypes = propTypes;

  state = {
    scrolled: false,
    drawerOpen: false,
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
    const { scrolled } = this.state;

    if (window.pageYOffset > 50) {
      if (!scrolled) {
        this.setState({ scrolled: true });
      }
    } else if (scrolled) {
      this.setState({ scrolled: false });
    }

    return false;
  };

  handleDrawerToggle = (drawerOpen: boolean) => {
    this.setState({ drawerOpen });
  };

  handleVerseDropdownClick = (verseKey: string) => {
    const { verses, setCurrentVerse } = this.props;

    if (verses[verseKey]) {
      return setCurrentVerse(verseKey);
    }
    // TODO: go to that verse

    return null;
  };

  render() {
    const {
      handleSidebarToggle,
      settings,
      chapter,
      chapters,
      verses,
    } = this.props;
    const { scrolled, drawerOpen } = this.state;

    const drawerToggle = (
      <button
        type="button"
        className="pointer btn btn-link"
        onClick={() => this.handleDrawerToggle(true)}
      >
        <i className="ss-icon ss-settings text-align" />
        <T id={KEYS.SETTING_TITLE} />
      </button>
    );

    return (
      <BootstrapNavbar
        className="montserrat"
        style={scrolled ? scrolledStyle : {}}
        fixedTop
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
          <li>
            <Link to="/" {...NAVBAR_EVENTS.CLICK.HOME_LINK.PROPS}>
              <i className="ss-icon ss-home" />
            </Link>
          </li>
          <ChaptersDropdown chapter={chapter} chapters={chapters} />
          <VersesDropdown
            chapter={chapter}
            verses={verses}
            isReadingMode={settings.isReadingMode}
            onClick={this.handleVerseDropdownClick}
          />
          {/* <div className="navbar-form navbar-left hidden-xs hidden-sm">
            <SearchInput className="search-input" />
          </div>, */}
          <li className="visible-xs-inline-block visible-sm-inline-block">
            <Link to="/search">
              <i
                className="ss-icon ss-search"
                style={{ verticalAlign: 'sub' }}
              />
            </Link>
          </li>
          <li className="visible-xs visible-sm">{drawerToggle}</li>
          <Drawer
            right
            drawerClickClose={false}
            open={drawerOpen}
            // eslint-disable-next-line
            handleOpen={this.handleDrawerToggle}
            toggle={<noscript />}
            header={
              <h4>
                <T id={KEYS.SETTING_TITLE} />
              </h4>
            }
          >
            {/* <Settings
              chapter={chapter}
              verses={verses}
              setSetting={setSetting}
              settings={settings}
            /> */}
          </Drawer>
        </StyledNav>
        <Nav pullRight className="hidden-xs hidden-sm">
          <li>{drawerToggle}</li>
        </Nav>
      </BootstrapNavbar>
    );
  }
}

export default Navbar;
