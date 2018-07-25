import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

import Drawer from 'quran-components/lib/Drawer';
import SearchInput from 'components/SearchInput';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { load, setCurrentVerse } from 'redux/actions/verses.js';
import ComponentLoader from '../../ComponentLoader';

import GlobalNav from '../index';

const ChaptersDropdown = asyncComponent({
  resolve: () =>
    import(/* webpackChunkName: "ChaptersDropdown" */ '../../ChaptersDropdown'),
  LoadingComponent: ComponentLoader,
});

const VersesDropdown = asyncComponent({
  resolve: () =>
    import(/* webpackChunkName: "VersesDropdown" */ '../../VersesDropdown'),
  LoadingComponent: ComponentLoader,
});

const Settings = asyncComponent({
  resolve: () => import(/* webpackChunkName: "Settings" */ '../../Settings'),
  LoadingComponent: ComponentLoader,
});

class GlobalNavChapter extends Component {
  state = {
    drawerOpen: false,
  };

  handleVerseDropdownClick = verseNum => {
    const { versesIds, chapter } = this.props; // eslint-disable-line no-shadow

    if (versesIds.has(verseNum)) {
      this.props.setCurrentVerse(`${chapter.chapterNumber}:${verseNum}`);

      return false;
    }

    const to = Math.min(...[verseNum + 10, chapter.versesCount]);

    // eslint-disable-next-line react/prop-types
    return this.props.history.push(
      `/${chapter.chapterNumber}/${verseNum}-${to}`
    );
  };

  handleDrawerToggle = open => {
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
    const { chapter, chapters, versesIds, options, ...props } = this.props;

    if (!chapter) {
      return null;
    }

    return (
      <GlobalNav
        {...props}
        leftControls={[
          <ChaptersDropdown chapter={chapter} chapters={chapters} />,
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
          </Drawer>,
        ]}
        rightControls={[this.renderDrawerToggle()]}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const chapterId = parseInt(ownProps.match.params.chapterId, 10);
  const chapter = state.chapters.entities[chapterId];
  const verses = state.verses.entities[chapterId];
  const versesArray = verses
    ? Object.keys(verses).map(key => parseInt(key.split(':')[1], 10))
    : [];
  const versesIds = new Set(versesArray);

  return {
    chapter,
    chapters: state.chapters.entities,
    options: state.options,
    versesIds,
  };
}

GlobalNavChapter.propTypes = {
  chapter: customPropTypes.chapterType.isRequired,
  chapters: customPropTypes.chapters.isRequired,
  options: customPropTypes.optionsType.isRequired,
  versesIds: PropTypes.instanceOf(Set),
  load: PropTypes.func.isRequired,
  setCurrentVerse: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    load,
    replace,
    setCurrentVerse,
  }
)(GlobalNavChapter);
