/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Helmet from 'react-helmet';
import Loadable from 'react-loadable';

// components
import Loader from 'quran-components/lib/Loader';
import Verse from 'components/Verse';
import ComponentLoader from 'components/ComponentLoader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import GlobalNavSurah from 'components/GlobalNav/Surah';

// Helpers
import makeHeadTags from 'helpers/makeHeadTags';
import debug from 'helpers/debug';

import * as AudioActions from 'redux/actions/audioplayer.js';
import * as AyahActions from 'redux/actions/verses.js';
import * as BookmarkActions from 'redux/actions/bookmarks.js';
import * as OptionsActions from 'redux/actions/options.js';
import * as MediaActions from 'redux/actions/media.js';

import chaptersQuery from 'graphql/queries/chapters';
import chapterQuery from 'graphql/queries/chapter';
import chapterInfoQuery from 'graphql/queries/chapterInfo';
import versesQuery from 'graphql/queries/verses';

import generateLines from 'utils/generateLines';
import determinePageForChapter from 'utils/determinePageForChapter';
import { fontFaceStyle } from 'helpers/buildFontFaces';

const style = require('./style.scss');

const LazyLoad = Loadable({
  loader: () =>
    import(/* webpackChunkName: "LazyLoad" */ 'components/LazyLoad'),
  loading: ComponentLoader
});

const Bismillah = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Bismillah" */ 'components/Bismillah'),
  loading: ComponentLoader
});

const PageView = Loadable({
  loader: () =>
    import(/* webpackChunkName: "PageView" */ 'components/PageView'),
  loading: ComponentLoader
});

const Audioplayer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "AudioplayerContainer" */ 'containers/AudioplayerContainer'),
  loading: ComponentLoader
});

const SurahInfo = Loadable({
  loader: () =>
    import(/* webpackChunkName: "SurahInfo" */ 'components/SurahInfo'),
  loading: ComponentLoader
});

const TopOptions = Loadable({
  loader: () =>
    import(/* webpackChunkName: "TopOptions" */ 'components/TopOptions'),
  loading: ComponentLoader
});

class ChapterContainer extends Component {
  state = {
    lazyLoading: false,
    sidebarOpen: false
  };

  getLast() {
    const { versesQuery: { verses } } = this.props;

    return [...verses].reverse()[0].verseNumber;
  }

  getFirst() {
    const { versesQuery: { verses } } = this.props;

    return [...verses][0].verseNumber;
  }

  getCurrentVerse() {
    const { currentVerse, versesQuery: { verses } } = this.props;

    return currentVerse || verses[0].verseKey;
  }

  getVerseIds() {
    const { versesQuery: { verses } } = this.props;

    if (verses) {
      return verses.map(verse => verse.verseNumber);
    }

    return [];
  }

  handleLazyLoadAyahs = (callback) => {
    const {
      versesQuery: { verses, loading, fetchMore },
      chapterQuery: { chapter }
    } = this.props; // eslint-disable-line no-shadow, max-len
    const { lazyLoading } = this.state;

    this.setState({ lazyLoading: true });
    debug('component:Surah', 'handleLazyLoadAyahs');
    const range = [this.getFirst(), this.getLast()];

    const size = 10;
    const from = parseInt(range[1], 10);
    const to = from + size;
    const paging = { offset: from, limit: to - from };
    const toVerse = verses.find(verse => verse.verseNumber === to);

    if (!this.isEndOfSurah() && !toVerse && !loading && !lazyLoading) {
      fetchMore({
        variables: {
          chapterId: chapter.id,
          ...paging
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            ...previousResult,
            verses: [...previousResult.verses, ...fetchMoreResult.verses]
          };
        }
      }).then(() => {
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

  title() {
    const { match: { params }, chapterQuery: { chapter } } = this.props;

    if (params.range) {
      return `Surah ${chapter.nameSimple} [${chapter.chapterNumber}:${params.range}]`;
    }

    return `Surah ${chapter.nameSimple} [${chapter.chapterNumber}]`;
  }

  description() {
    const {
      match: { params },
      versesQuery: { verses },
      chapterQuery: { chapter },
      chapterInfoQuery: { chapterInfo }
    } = this.props;

    if (params.range) {
      if (params.range.includes('-')) {
        const [from, to] = params.range
          .split('-')
          .map(num => parseInt(num, 10));
        const array = Array(to - from).fill(from);
        const translations = array.map((fromAyah, index) => {
          const verse = verses[`${chapter.chapterNumber}:${fromAyah + index}`];

          if (verse && verse.content && verse.content[0]) {
            return verse.content[0].text;
          }

          return '';
        });

        const content = translations.join(' - ').slice(0, 250);

        return `Surat ${chapter.nameSimple} [verse ${params.range}] - ${content}`;
      }

      const verse = verses[`${chapter.chapterNumber}:${params.range}`];

      if (verse && verse.content && verse.content[0]) {
        return `Surat ${chapter.nameSimple} [verse ${params.range}] - ${verse
          .content[0].text}`;
      }

      return `Surat ${chapter.nameSimple} [verse ${params.range}]`;
    }

    return `${chapterInfo
      ? chapterInfo.shortText
      : ''} This Surah has ${chapter.versesCount} verses and resides between pages ${chapter
      .pages[0]} to ${chapter.pages[1]} in the Quran.`; // eslint-disable-line max-len
  }

  isEndOfSurah() {
    const { chapterQuery: { chapter }, versesQuery: { verses } } = this.props;

    if (chapter && verses) {
      return chapter.versesCount === [...verses].reverse()[0].verseNumber;
    }

    return false;
  }

  renderNoAyah() {
    const { versesQuery: { loading } } = this.props;

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

    return loading ? <Loader isActive relative /> : noAyah;
  }

  renderPagination() {
    const {
      isSingleAyah,
      actions,
      chapterQuery: { chapter },
      versesQuery: { loading },
      options
    } = this.props;
    const translations = (options.translations || []).join(',');

    // If single verse, eh. /2/30
    if (isSingleAyah) {
      const to =
        this.getFirst() + 10 > chapter.versesCount
          ? chapter.versesCount
          : this.getFirst() + 10;

      return (
        <ul className="pager">
          <li className="text-center">
            <Link
              to={`/${chapter.chapterNumber}/${this.getFirst()}-${to}?translations=${translations}`}
            >
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
        isEnd={this.isEndOfSurah() && !loading}
        isLoading={this.state.lazyLoading}
        endComponent={
          <ul className="pager">
            {chapter.chapterNumber > 1 && (
              <li className="previous">
                <Link
                  to={`/${chapter.chapterNumber * 1 -
                    1}?translations=${translations}`}
                >
                  ←
                  <LocaleFormattedMessage
                    id="chapter.previous"
                    defaultMessage="Previous Surah"
                  />
                </Link>
              </li>
            )}
            <li className="text-center">
              <Link
                to={`/${chapter.chapterNumber}?translations=${translations}`}
                onClick={() =>
                  actions.verse.setCurrentVerse(
                    `${chapter.chapterNumber}:${this.getFirst()}`
                  )}
              >
                <LocaleFormattedMessage
                  id="chapter.goToBeginning"
                  defaultMessage="Beginning of Surah"
                />
              </Link>
            </li>
            {chapter.chapterNumber < 114 && (
              <li className="next">
                <Link
                  to={`/${chapter.chapterNumber * 1 +
                    1}?translations=${translations}`}
                >
                  <LocaleFormattedMessage
                    id="chapter.next"
                    defaultMessage="Next Surah"
                  />
                  →
                </Link>
              </li>
            )}
          </ul>
        }
        loading={<Loader isActive={this.state.lazyLoading} relative />}
      />
    );
  }

  renderVerses() {
    const {
      chapterQuery: { chapter },
      versesQuery: { loading, verses },
      actions,
      options,
      bookmarks,
      isPlaying,
      isAuthenticated
    } = this.props; // eslint-disable-line no-shadow

    return (
      !loading &&
      verses.map(verse => (
        <Verse
          verse={verse}
          chapter={chapter}
          currentVerse={this.getCurrentVerse()}
          iscurrentVerse={
            isPlaying && verse.verseKey === this.getCurrentVerse()
          }
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
      ))
    );
  }

  renderLines() {
    const { lines, options, isPlaying, actions } = this.props;
    const keys = Object.keys(lines);

    return (
      <PageView
        lines={lines}
        keys={keys}
        options={options}
        currentVerse={this.getCurrentVerse()}
        audioActions={actions.audio}
        isPlaying={isPlaying}
      />
    );
  }

  renderFonts() {
    const { versesQuery: { verses } } = this.props;

    if (verses) {
      return verses
        .reduce((pages, verse) => {
          if (pages.includes(verse.pageNumber)) {
            return pages;
          }

          return [...pages, verse.pageNumber];
        }, [])
        .map(pageNumber => (
          <style
            key={`p${pageNumber}`}
            dangerouslySetInnerHTML={{
              __html: fontFaceStyle(`p${pageNumber}`)
            }}
          />
        ));
    }

    return <noscript />;
  }

  renderHelmet() {
    const { chapterQuery: { chapter }, options } = this.props;

    return (
      <Helmet
        {...makeHeadTags({
          title: this.title(),
          description: this.description()
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
            cssText: `
              .text-arabic{font-size: ${options.fontSize.arabic}rem;}
              .text-translation{font-size: ${options.fontSize.translation}rem;}
            `
          }
        ]}
      />
    );
  }

  render() {
    const {
      chapterQuery: { loading: chapterLoading, chapter },
      chaptersQuery: { chapters },
      versesQuery: { loading: versesLoading, verses },
      chapterInfoQuery: { chapterInfo },
      options,
      actions
    } = this.props;
    debug('component:Surah', 'Render');

    if (chapterLoading || versesLoading) {
      return (
        <div className={style.container} style={{ margin: '50px auto' }}>
          {this.renderNoAyah()}
        </div>
      );
    }

    return (
      <div>
        {this.renderHelmet()}
        <GlobalNavSurah
          chapter={chapter}
          chapters={chapters}
          options={options}
          verses={verses}
        />
        <div className={`container-fluid ${style.container}`}>
          <div className="row">
            <SurahInfo
              chapter={chapter}
              info={chapterInfo}
              loadInfo={actions.loadInfo}
              isShowingSurahInfo={options.isShowingSurahInfo}
              onClose={this.handleSurahInfoToggle}
            />
            <div className="col-md-10 col-md-offset-1">
              {__CLIENT__ && <TopOptions chapter={chapter} />}
              <Bismillah chapter={chapter} />
              {options.isReadingMode ? this.renderLines() : this.renderVerses()}
              {this.renderFonts()}
            </div>
            <div className="col-md-10 col-md-offset-1">
              {this.renderPagination()}
            </div>
          </div>
        </div>
        <Audioplayer
          chapter={chapter}
          verses={verses}
          currentVerse={verses.find(
            verse => verse.verseKey === this.getCurrentVerse()
          )}
          audio={options.audio}
          onLoadAyahs={this.handleLazyLoadAyahs}
        />
      </div>
    );
  }
}

ChapterContainer.propTypes = {
  actions: PropTypes.object.isRequired, // eslint-disable-line
  lines: PropTypes.object.isRequired, // eslint-disable-line
  currentVerse: PropTypes.string,
  versesQuery: PropTypes.object, // eslint-disable-line
  chapterQuery: PropTypes.object, // eslint-disable-line
  chapterInfoQuery: PropTypes.object, // eslint-disable-line
  chaptersQuery: PropTypes.object, // eslint-disable-line
  bookmarks: PropTypes.object.isRequired, // eslint-disable-line
  isSingleAyah: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired, // eslint-disable-line
  match: PropTypes.shape({
    params: PropTypes.shape({
      chapterId: PropTypes.string.isRequired
    }).isRequired
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
      media: bindActionCreators(MediaActions, dispatch),
      push: bindActionCreators(push, dispatch)
    }
  };
}

const Graphed = compose(
  graphql(chaptersQuery, {
    name: 'chaptersQuery'
  }),
  graphql(chapterQuery, {
    name: 'chapterQuery',
    options: ({ match: { params } }) => ({
      variables: { chapterId: params.chapterId }
    })
  }),
  graphql(chapterInfoQuery, {
    name: 'chapterInfoQuery',
    options: ({ match: { params } }) => ({
      ssr: false,
      variables: { chapterId: params.chapterId }
    })
  }),
  graphql(versesQuery, {
    name: 'versesQuery',
    options: ({ match: { params }, options }) => ({
      variables: {
        resource_content_id: options.translations,
        chapterId: params.chapterId,
        ...determinePageForChapter(params.range)
      }
    }),
    props: ({ versesQuery: query }) => ({
      // eslint-disable-line
      lines: query.verses ? generateLines(query.verses) : [],
      versesQuery: query
    })
  })
)(ChapterContainer);

export default connect(mapStateToProps, mapDispatchToProps)(Graphed);
