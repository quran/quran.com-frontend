/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import { Link } from 'react-router-dom';

import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

import verseQuery from 'graphql/queries/verse';
import chapterQuery from 'graphql/queries/chapter';

import { fontFaceStyle } from 'helpers/buildFontFaces';

const style = require('../ChapterContainer/style.scss');

const PageView = Loadable({
  loader: () =>
    import(/* webpackChunkName: "pageview" */ 'components/PageView'),
  loading: ComponentLoader
});

const Audioplayer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "audioplayer" */ 'components/Audioplayer'),
  loading: ComponentLoader
});

const TopOptions = Loadable({
  loader: () =>
    import(/* webpackChunkName: "topoptions" */ 'components/TopOptions'),
  loading: ComponentLoader
});

const title = 'Ayatul Kursi';
const description =
  'Ayatul Kursi is verse 255 of the second chapter, ' +
  'Surah al-Baqarah (The Chapter of the Cow), in the ' +
  'Holy Quran. It is also known as the Throne Verse.';

class AyatulKursi extends Component {
  state = {
    sidebarOpen: false
  };

  renderVerses() {
    const {
      chapterQuery: { chapter },
      verseQuery: { verse },
      actions,
      options,
      bookmarks,
      isPlaying,
      isAuthenticated,
      currentVerse
    } = this.props; // eslint-disable-line no-shadow

    return (
      verse && (
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
      )
    );
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

  renderFonts() {
    const { verseQuery: { verse } } = this.props;

    if (verse) {
      return (
        <style
          key={`p${verse.pageNumber}`}
          dangerouslySetInnerHTML={{
            __html: fontFaceStyle(`p${verse.pageNumber}`)
          }}
        />
      );
    }

    return <noscript />;
  }

  render() {
    const {
      chapterQuery: { chapter },
      verseQuery: { verse },
      options
    } = this.props; // eslint-disable-line no-shadow
    debug('component:AyatulKursi', 'Render');

    return (
      <div>
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
              cssText: `.text-arabic{font-size: ${options.fontSize
                .arabic}rem;} .text-translation{font-size: ${options.fontSize
                .translation}rem;}` // eslint-disable-line max-len
            }
          ]}
        />
        <div className={`container-fluid ${style.container}`}>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {__CLIENT__ && (
                <TopOptions title="Ayatul Kursi" chapter={chapter} />
              )}
              <Bismillah chapter={chapter} />
              {options.isReadingMode ? this.renderLines() : this.renderVerses()}
              {this.renderFonts()}
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
        {__CLIENT__ && (
          <Audioplayer
            chapter={chapter}
            startVerse={verse}
            onLoadAyahs={this.handleLazyLoadAyahs}
          />
        )}
      </div>
    );
  }
}

AyatulKursi.propTypes = {
  chapterQuery: PropTypes.shape({
    chapter: customPropTypes.chapterType.isRequired
  }),
  actions: PropTypes.object.isRequired, // eslint-disable-line
  lines: PropTypes.object.isRequired, // eslint-disable-line
  currentVerse: PropTypes.string,
  bookmarks: PropTypes.object.isRequired, // eslint-disable-line
  isAuthenticated: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired, // eslint-disable-line
  verseQuery: PropTypes.shape({
    verse: customPropTypes.verses
  }),
  isPlaying: PropTypes.bool
};

function mapStateToProps(state, { match: { params } }) {
  return {
    info: state.chapters.infos[params.chapterId],
    isStarted: state.audioplayer.isStarted,
    isPlaying: state.audioplayer.isPlaying,
    isAuthenticated: state.auth.loaded,
    currentWord: state.verses.currentWord,
    chapters: state.chapters.entities,
    bookmarks: state.bookmarks.entities,
    isLoading: state.verses.loading,
    isLoaded: state.verses.loaded,
    lines: state.lines.lines,
    options: state.options,
    currentVerse: state.audioplayer.currentVerse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      options: bindActionCreators(OptionsActions, dispatch),
      verse: bindActionCreators(AyahActions, dispatch),
      audio: bindActionCreators(AudioActions, dispatch),
      bookmark: bindActionCreators(BookmarkActions, dispatch),
      media: bindActionCreators(MediaActions, dispatch)
    }
  };
}

const Graphed = compose(
  graphql(chapterQuery, {
    name: 'chapterQuery',
    options: {
      variables: {
        chapterId: 2
      }
    }
  }),
  graphql(verseQuery, {
    name: 'verseQuery',
    options: {
      ssr: false,
      variables: {
        verseKey: '2:255'
      }
    }
  })
)(AyatulKursi);

export default connect(mapStateToProps, mapDispatchToProps)(Graphed);
