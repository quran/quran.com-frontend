/* global window, document */
import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import Link from 'react-router/lib/Link';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';

import Helmet from 'react-helmet';
import Loadable from 'react-loadable';

// components
import Verse from 'components/Verse';
import ComponentLoader from 'components/ComponentLoader';
import Bismillah from 'components/Bismillah';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

// Helpers
import makeHeadTags from 'helpers/makeHeadTags';
import debug from 'helpers/debug';

import * as AudioActions from 'redux/actions/audioplayer.js';
import * as AyahActions from 'redux/actions/verses.js';
import * as BookmarkActions from 'redux/actions/bookmarks.js';
import * as OptionsActions from 'redux/actions/options.js';
import * as MediaActions from 'redux/actions/media.js';

import { chaptersConnect, versesConnect } from 'containers/Surah/connect';

const style = require('../Surah/style.scss');

const PageView = Loadable({
  loader: () =>
    import(/* webpackChunkName: "pageview" */ 'components/PageView'),
  LoadingComponent: ComponentLoader
});

const Audioplayer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "audioplayer" */ 'components/Audioplayer'),
  LoadingComponent: ComponentLoader
});

const TopOptions = Loadable({
  loader: () =>
    import(/* webpackChunkName: "topoptions" */ 'components/TopOptions'),
  LoadingComponent: ComponentLoader
});

const title = 'Ayatul Kursi';
const description = 'Ayatul Kursi is verse 255 of the second chapter, ' +
                    'Surah al-Baqarah (The Chapter of the Cow), in the ' +
                    'Holy Quran. It is also known as the Throne Verse.';

class AyatulKursi extends Component {
  state = {
    sidebarOpen: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const conditions = [
      this.state.sidebarOpen !== nextState.sidebarOpen,
      this.props.chapter !== nextProps.chapter,
      this.props.bookmarks !== nextProps.bookmarks,
      this.props.isLoading !== nextProps.isLoading,
      this.props.isLoaded !== nextProps.isLoaded,
      this.props.options !== nextProps.options,
      this.props.currentVerse !== nextProps.currentVerse,
      this.props.isPlaying !== nextProps.isPlaying
    ];

    return conditions.some(condition => condition);
  }

  handleLazyLoadAyahs = () => false;

  renderVerses() {
    const {
      chapter,
      verses,
      actions,
      options,
      bookmarks,
      isPlaying,
      isAuthenticated,
      currentVerse
    } = this.props; // eslint-disable-line no-shadow

    return Object.values(verses).map(verse => (
      <Verse
        verse={verse}
        chapter={chapter}
        currentVerse={currentVerse}
        iscurrentVerse={isPlaying && verse.verseKey === currentVerse}
        bookmarked={!!bookmarks[verse.verseKey]}
        tooltip={options.tooltip}
        bookmarkActions={actions.bookmark}
        audioActions={actions.audio}
        mediaActions={actions.media}
        isPlaying={isPlaying}
        isAuthenticated={isAuthenticated}
        key={`${verse.chapterId}-${verse.id}-verse`}
        userAgent={options.userAgent}
        audio={options.audio}
      />
    ));
  }

  renderLines() {
    const {
      lines,
      options,
      currentVerse,
      isPlaying,
      actions
    } = this.props;
    const keys = Object.keys(lines);

    return (
      <PageView
        lines={lines}
        keys={keys}
        options={options}
        currentVerse={currentVerse}
        audioActions={actions.audio}
        isPlaying={isPlaying}
      />
    );
  }

  render() {
    const {
      chapter,
      verses,
      options
    } = this.props; // eslint-disable-line no-shadow
    debug('component:AyatulKursi', 'Render');

    return (
      <div className="chapter-body">
        <Helmet
          {...makeHeadTags({
            title,
            description
          })}
          script={[
            {
              type: 'application/ld+json',
              innerHTML: `{
              "@context": "http://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@id": "https://quran.com/",
                  "name": "Quran"
                }
              },{
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://quran.com/ayatul-kursi",
                  "name": "Ayatul Kursi"
                }
              }]
            }`
            }
          ]}
          style={[
            {
              cssText: `.text-arabic{font-size: ${options.fontSize.arabic}rem;} .text-translation{font-size: ${options.fontSize.translation}rem;}` // eslint-disable-line max-len
            }
          ]}
        />
        <div className={`container-fluid ${style.container}`}>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {__CLIENT__ &&
                <TopOptions title="Ayatul Kursi" chapter={chapter} />}
              <Bismillah chapter={chapter} />
              {options.isReadingMode ? this.renderLines() : this.renderVerses()}
            </div>
            <div className="col-md-10 col-md-offset-1">
              <ul className="pager">
                <li className="text-center">
                  <Link to="/2/255-265">
                    <LocaleFormattedMessage
                      id="chapter.index.continue"
                      defaultMessage="Continue"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {__CLIENT__ &&
          <Audioplayer
            chapter={chapter}
            startVerse={Object.values(verses)[0]}
            onLoadAyahs={this.handleLazyLoadAyahs}
          />}
      </div>
    );
  }
}

AyatulKursi.propTypes = {
  chapter: customPropTypes.surahType.isRequired,
  actions: PropTypes.object.isRequired, // eslint-disable-line
  lines: PropTypes.object.isRequired, // eslint-disable-line
  currentVerse: PropTypes.string,
  bookmarks: PropTypes.object.isRequired, // eslint-disable-line
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired, // eslint-disable-line
  verses: customPropTypes.verses,
  isPlaying: PropTypes.bool
};

const AsyncAyatulKursi = asyncConnect([
  { promise: chaptersConnect },
  {
    promise: ({ store }) =>
      versesConnect({ store, params: { chapterId: '2', range: '255' } })
  }
])(AyatulKursi);

function mapStateToProps(state) {
  const chapterId = 2;
  const chapter: Object = state.chapters.entities[chapterId];
  const verses: Object = state.verses.entities[chapterId];
  const currentVerse = state.audioplayer.currentVerse || Object.keys(verses)[0];

  return {
    chapter,
    verses,
    currentVerse,
    isStarted: state.audioplayer.isStarted,
    isPlaying: state.audioplayer.isPlaying,
    isAuthenticated: state.auth.loaded,
    currentWord: state.verses.currentWord,
    bookmarks: state.bookmarks.entities,
    isLoading: state.verses.loading,
    isLoaded: state.verses.loaded,
    lines: state.lines.lines,
    options: state.options
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      options: bindActionCreators(OptionsActions, dispatch),
      verse: bindActionCreators(AyahActions, dispatch),
      audio: bindActionCreators(AudioActions, dispatch),
      bookmark: bindActionCreators(BookmarkActions, dispatch),
      media: bindActionCreators(MediaActions, dispatch),
      push: bindActionCreators(push, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncAyatulKursi);
