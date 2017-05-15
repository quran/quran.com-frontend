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
import Loader from 'quran-components/lib/Loader';
import LazyLoad from 'components/LazyLoad';
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

const LoaderStyle = { width: '10em', height: '10em' };

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

const description =
  'Ayatul Kursi is verse 255 of the second chapter, surah Baqarah of the Holy Quran, Surah al-Baqarah (The Chapter of the Cow).  It is also known as the Throne Verse.';

class AyatulKursi extends Component {
  state = {
    lazyLoading: false,
    sidebarOpen: false
  };

  componentWillMount() {
    const { params, chapter, actions } = this.props; // eslint-disable-line no-shadow

    if (params.range && params.range.includes('-')) {
      const start = parseInt(params.range.split('-')[0], 10);

      if (start > chapter.versesCount || isNaN(start)) {
        return actions.push.push('/error/invalid-verse-range');
      }

      return false;
    }

    return false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const conditions = [
      this.state.lazyLoading !== nextState.lazyLoading,
      this.state.sidebarOpen !== nextState.sidebarOpen,
      this.props.chapter !== nextProps.chapter,
      this.props.isEndOfSurah !== nextProps.isEndOfSurah,
      this.props.verseIds.length !== nextProps.verseIds.length,
      this.props.chapters !== nextProps.chapters,
      this.props.bookmarks !== nextProps.bookmarks,
      this.props.isLoading !== nextProps.isLoading,
      this.props.isLoaded !== nextProps.isLoaded,
      this.props.options !== nextProps.options,
      this.props.currentVerse !== nextProps.currentVerse,
      this.props.isPlaying !== nextProps.isPlaying
    ];

    return conditions.some(condition => condition);
  }

  getLast() {
    const { verseIds } = this.props;

    return [...verseIds][[...verseIds].length - 1];
  }

  getFirst() {
    const { verseIds } = this.props;

    return [...verseIds][0];
  }

  hasVerses() {
    return Object.keys(this.props.verses).length;
  }

  handleLazyLoadAyahs = (callback) => {
    const { verseIds, chapter, isEndOfSurah, options, actions } = this.props; // eslint-disable-line no-shadow, max-len
    const range = [this.getFirst(), this.getLast()];

    const size = 10;
    const from = range[1];
    const to = from + size;
    const paging = { offset: from, limit: to - from };

    if (!isEndOfSurah && !verseIds.has(to)) {
      actions.verse.load(chapter.chapterNumber, paging, options).then(() => {
        this.setState({ lazyLoading: false });
        return callback && callback();
      });
    }

    return false;
  };

  handleSurahInfoToggle = (payload) => {
    const { actions } = this.props; // eslint-disable-line no-shadow

    return actions.options.setOption(payload);
  };

  renderNoAyah() {
    const { isLoading } = this.props;

    const noAyah = (
      <div className="text-center">
        <h2>
          <LocaleFormattedMessage
            id="ayah.notFound"
            defaultMessage="Ayah not found."
          />
        </h2>
      </div>
    );

    return isLoading ? <Loader isActive style={LoaderStyle} /> : noAyah;
  }

  renderPagination() {
    const { isSingleAyah, isLoading, isEndOfSurah, chapter } = this.props;

    // If single verse, eh. /2/30
    if (isSingleAyah) {
      const to = this.getFirst() + 10 > chapter.versesCount
        ? chapter.versesCount
        : this.getFirst() + 10;

      return (
        <ul className="pager">
          <li className="text-center">
            <Link to={`/${chapter.chapterNumber}/${this.getFirst()}-${to}`}>
              <LocaleFormattedMessage
                id="chapter.index.continue"
                defaultMessage="Continue"
              />
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <LazyLoad
        onLazyLoad={this.handleLazyLoadAyahs}
        isEnd={isEndOfSurah && !isLoading}
        isLoading={isLoading}
        endComponent={
          <ul className="pager">
            {chapter.chapterNumber > 1 &&
              <li className="previous">
                <Link to={`/${chapter.chapterNumber * 1 - 1}`}>
                  ←
                  <LocaleFormattedMessage
                    id="chapter.previous"
                    defaultMessage="Previous Surah"
                  />
                </Link>
              </li>}
            <li className="text-center">
              <Link to={`/${chapter.chapterNumber}`}>
                <LocaleFormattedMessage
                  id="chapter.goToBeginning"
                  defaultMessage="Beginning of Surah"
                />
              </Link>
            </li>
            {chapter.chapterNumber < 114 &&
              <li className="next">
                <Link to={`/${chapter.chapterNumber * 1 + 1}`}>
                  <LocaleFormattedMessage
                    id="chapter.next"
                    defaultMessage="Next Surah"
                  />
                  →
                </Link>
              </li>}
          </ul>
        }
        loadingComponent={<Loader isActive={isLoading} style={LoaderStyle} />}
      />
    );
  }

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
    const { lines, options, currentVerse, isPlaying, actions } = this.props;
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
    const { chapter, verses, options } = this.props; // eslint-disable-line no-shadow
    debug('component:Surah', 'Render');

    if (!this.hasVerses()) {
      return (
        <div className={style.container} style={{ margin: '50px auto' }}>
          {this.renderNoAyah()}
        </div>
      );
    }

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
                  "@id": "https://quran.com/${chapter.chapterNumber}",
                  "name": "${chapter.nameSimple}"
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
              {this.renderPagination()}
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
  chapters: customPropTypes.chapters.isRequired,
  actions: PropTypes.object.isRequired, // eslint-disable-line
  lines: PropTypes.object.isRequired, // eslint-disable-line
  isEndOfSurah: PropTypes.bool.isRequired,
  verseIds: PropTypes.instanceOf(Set),
  currentVerse: PropTypes.string,
  bookmarks: PropTypes.object.isRequired, // eslint-disable-line
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isSingleAyah: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired, // eslint-disable-line
  params: PropTypes.shape({
    chapterId: PropTypes.string.isRequired
  }).isRequired,
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
  const verseArray = verses
    ? Object.keys(verses).map(key => parseInt(key.split(':')[1], 10))
    : [];
  const verseIds = new Set(verseArray);
  const lastAyahInArray = verseArray.slice(-1)[0];
  const isSingleAyah = true;
  const currentVerse = state.audioplayer.currentVerse || Object.keys(verses)[0];

  return {
    chapter,
    verses,
    verseIds,
    isSingleAyah,
    currentVerse,
    isStarted: state.audioplayer.isStarted,
    isPlaying: state.audioplayer.isPlaying,
    isAuthenticated: state.auth.loaded,
    currentWord: state.verses.currentWord,
    isEndOfSurah: lastAyahInArray === chapter.versesCount,
    chapters: state.chapters.entities,
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
