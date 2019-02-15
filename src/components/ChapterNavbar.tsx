/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from 'quran-components/lib/Drawer';
import DlsNavbar from './dls/navbar/Navbar';
import Nav from './dls/navbar/Nav';

import ChaptersDropdown from './ChaptersDropdown';
import VersesDropdown from './VersesDropdown';
import Settings from './Settings';

import { NAVBAR_EVENTS } from '../events';
import { SettingsShape, VerseShape, ChapterShape } from '../shapes';
import T, { KEYS } from './T';
import { FetchVerses } from '../redux/actions/verses';
import { SetSetting } from '../redux/actions/settings';
import { SetCurrentVerseKey } from '../redux/actions/audioplayer';

const propTypes = {
  settings: SettingsShape.isRequired,
  verses: PropTypes.shape({
    verseKey: VerseShape,
  }),
  chapters: PropTypes.shape({
    chapterId: ChapterShape,
  }).isRequired,
  chapter: ChapterShape,
  setCurrentVerseKey: PropTypes.func.isRequired,
  setSetting: PropTypes.func.isRequired,
  fetchVerses: PropTypes.func.isRequired,
};

type Props = {
  verses: { [verseKey: string]: VerseShape };
  chapter?: ChapterShape;
  chapters: { [chapterId: string]: ChapterShape };
  settings: SettingsShape;
  setSetting: SetSetting;
  fetchVerses: FetchVerses;
  setCurrentVerseKey: SetCurrentVerseKey;
};

type DefaultProps = {
  verses?: undefined;
  chapter?: undefined;
};

const defaultProps: DefaultProps = {
  verses: undefined,
  chapter: undefined,
};

type State = {
  scrolled: boolean;
  drawerOpen: boolean;
};

class ChapterNavbar extends Component<Props, State> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

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
    const { verses, setCurrentVerseKey } = this.props;

    if (verses && verses[verseKey]) {
      return setCurrentVerseKey(verseKey);
    }
    // TODO: go to that verse

    return null;
  };

  render() {
    const {
      settings,
      chapter,
      chapters,
      verses,
      setSetting,
      fetchVerses,
    } = this.props;
    const { scrolled, drawerOpen } = this.state;

    const drawerToggle = (isMobile?: boolean) => (
      <li className={isMobile ? 'visible-xs visible-sm' : ''}>
        {/* eslint-disable-next-line */}
        <a onClick={() => this.handleDrawerToggle(true)}>
          <i className="ss-icon ss-settings text-align" />
          <T id={KEYS.SETTING_TITLE} />
        </a>
      </li>
    );

    return (
      <DlsNavbar scrolled={scrolled} fixed>
        <Nav>
          <li>
            <Link to="/" {...NAVBAR_EVENTS.CLICK.HOME_LINK.PROPS}>
              <i className="ss-icon ss-home" />
            </Link>
          </li>
          {chapter &&
            chapters && (
              <ChaptersDropdown chapter={chapter} chapters={chapters} />
            )}
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
          {drawerToggle(true)}
          <Drawer
            right
            drawerClickClose={false}
            open={drawerOpen}
            // eslint-disable-next-line
            handleOpen={this.handleDrawerToggle}
            toggle={<div />}
            header={
              <h4>
                <T id={KEYS.SETTING_TITLE} />
              </h4>
            }
          >
            {chapter &&
              verses && (
                <Settings
                  chapter={chapter}
                  verses={verses}
                  setSetting={setSetting}
                  fetchVerses={fetchVerses}
                  settings={settings}
                />
              )}
          </Drawer>
        </Nav>
        <Nav right className="hidden-xs hidden-sm">
          {drawerToggle()}
        </Nav>
      </DlsNavbar>
    );
  }
}

export default ChapterNavbar;
