import React, { PropTypes, Component } from 'react';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Link } from 'react-router-dom';
import Loadable from 'react-loadable';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import ComponentLoader from 'components/ComponentLoader';
import Drawer from 'quran-components/lib/Drawer';
import SurahsDropdown from 'components/SurahsDropdown';
import VersesDropdown from 'components/VersesDropdown';

import { load, setCurrentVerse } from 'redux/actions/verses.js';

import GlobalNav from '../index';

const Settings = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Settings" */ 'components/Settings'),
  loading: ComponentLoader
});

const SearchInput = Loadable({
  loader: () =>
    import(/* webpackChunkName: "SearchInput" */ 'components/SearchInput'),
  loading: ComponentLoader
});

class GlobalNavSurah extends Component {
  state = {
    drawerOpen: false
  };

  handleVerseDropdownClick = (verseNum) => {
    const { verses, chapter } = this.props;

    this.props.setCurrentVerse(`${chapter.chapterNumber}:${verseNum}`);

    if (verses.find(verse => verse.verseNumber === verseNum)) {
      return false;
    }

    const to = Math.min(...[verseNum + 10, chapter.versesCount]);

    return this.props.replace(`/${chapter.chapterNumber}/${verseNum}-${to}`);
  };

  handleDrawerToggle = (open) => {
    this.setState({ drawerOpen: open });
  };

  renderDrawerToggle(visibleXs) {
    return (
      <li>
        <a
          tabIndex="-1"
          className={`pointer ${visibleXs && 'visible-xs visible-sm'}`}
          onClick={() => this.handleDrawerToggle(true)}
        >
          <i className="ss-icon ss-settings text-align" />
          <LocaleFormattedMessage
            id="setting.title"
            defaultMessage="Settings"
          />
        </a>
      </li>
    );
  }

  render() {
    const { chapter, chapters, verses, options, ...props } = this.props;
    const versesIds = verses.map(verse => verse.verseNumber);

    return (
      <GlobalNav
        {...props}
        leftControls={[
          <SurahsDropdown chapter={chapter} chapters={chapters} />,
          <VersesDropdown
            chapter={chapter}
            isReadingMode={options.isReadingMode}
            loadedVerses={versesIds}
            onClick={this.handleVerseDropdownClick}
          />,
          <div className="navbar-form navbar-left hidden-xs hidden-sm">
            <SearchInput className="search-input" />
          </div>,
          <li className="visible-xs-inline-block visible-sm-inline-block">
            <Link to="/search">
              <i
                className="ss-icon ss-search"
                style={{ verticalAlign: 'sub' }}
              />
            </Link>
          </li>,
          this.renderDrawerToggle(true),
          <Drawer
            right
            drawerClickClose={false}
            open={this.state.drawerOpen}
            handleOpen={this.handleDrawerToggle}
            toggle={<noscript />}
            header={
              <h4>
                <LocaleFormattedMessage
                  id="setting.title"
                  defaultMessage="Settings"
                />
              </h4>
            }
          >
            <Settings chapter={chapter} versesIds={versesIds} />
          </Drawer>
        ]}
        rightControls={[this.renderDrawerToggle()]}
      />
    );
  }
}

GlobalNavSurah.propTypes = {
  chapter: customPropTypes.chapterType.isRequired,
  chapters: customPropTypes.chapters.isRequired,
  options: customPropTypes.optionsType.isRequired,
  verses: PropTypes.array, // eslint-disable-line
  load: PropTypes.func.isRequired,
  setCurrentVerse: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired
};

export default connect(null, {
  load,
  replace,
  setCurrentVerse
})(GlobalNavSurah);
