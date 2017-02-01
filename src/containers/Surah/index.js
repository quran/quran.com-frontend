/* global window, document */
import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';

import Helmet from 'react-helmet';

// components
import Loader from 'components/Loader';
import LazyLoad from 'components/LazyLoad';
import PageBreak from 'components/PageBreak';
import Audioplayer from 'components/Audioplayer';
import SurahInfo from 'components/SurahInfo';
import Ayah from 'components/Ayah';
import Line from 'components/Line';
import Bismillah from 'components/Bismillah';
import TopOptions from 'components/TopOptions';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

// utils
import scroller from 'utils/scroller';

// Helpers
import makeHeadTags from 'helpers/makeHeadTags';
import debug from 'helpers/debug';

import { surahType, ayahType } from 'types';

import * as AudioActions from 'redux/actions/audioplayer.js';
import * as AyahActions from 'redux/actions/ayahs.js';
import * as BookmarkActions from 'redux/actions/bookmarks.js';
import * as OptionsActions from 'redux/actions/options.js';
import * as MediaActions from 'redux/actions/media.js';

import { surahsConnect, surahInfoConnect, ayahsConnect } from './connect';

const style = require('./style.scss');

class Surah extends Component {
  static propTypes = {
    chapter: surahType.isRequired,
    chapters: PropTypes.objectOf(surahType).isRequired,
    actions: PropTypes.object.isRequired, // eslint-disable-line
    lines: PropTypes.object.isRequired, // eslint-disable-line
    isEndOfSurah: PropTypes.bool.isRequired,
    ayahIds: PropTypes.instanceOf(Set),
    currentAyah: PropTypes.string,
    bookmarks: PropTypes.object.isRequired, // eslint-disable-line
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSingleAyah: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    options: PropTypes.object.isRequired, // eslint-disable-line
    params: PropTypes.shape({
      surahId: PropTypes.string.isRequired
    }).isRequired,
    ayahs: PropTypes.objectOf(ayahType),
    isPlaying: PropTypes.bool
  };

  state = {
    lazyLoading: false,
    sidebarOpen: false
  };

  componentWillMount() {
    const { params, chapter, actions } = this.props; // eslint-disable-line no-shadow

    if (params.range && params.range.includes('-')) {
      const start = parseInt(params.range.split('-')[0], 10);

      if (start > chapter.versesCount || isNaN(start)) {
        return actions.push.push('/error/invalid-ayah-range');
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
      this.props.ayahIds.length !== nextProps.ayahIds.length,
      this.props.chapters !== nextProps.chapters,
      this.props.bookmarks !== nextProps.bookmarks,
      this.props.isLoading !== nextProps.isLoading,
      this.props.isLoaded !== nextProps.isLoaded,
      this.props.options !== nextProps.options,
      this.props.currentAyah !== nextProps.currentAyah,
      this.props.isPlaying !== nextProps.isPlaying,
    ];

    return conditions.some(condition => condition);
  }

  getLast() {
    const { ayahIds } = this.props;

    return [...ayahIds][[...ayahIds].length - 1];
  }

  getFirst() {
    const { ayahIds } = this.props;

    return [...ayahIds][0];
  }

  hasAyahs() {
    return Object.keys(this.props.ayahs).length;
  }

  handleVerseDropdownClick = (ayahNum) => {
    const { ayahIds, chapter, actions } = this.props; // eslint-disable-line no-shadow

    actions.ayah.setCurrentAyah(`${chapter.chapterNumber}:${ayahNum}`);

    if (ayahIds.has(ayahNum)) {
      return false;
    }

    if (ayahNum > (this.getLast() + 10) || ayahNum < this.getFirst()) {
      // This is beyond lazy loading next page.
      if (actions.push) {
        return actions.push.push(`/${chapter.chapterNumber}/${ayahNum}-${ayahNum + 10}`);
      }
    }

    return this.handleLazyLoadAyahs(() => setTimeout(() =>
      scroller.scrollTo(`ayah:${chapter.chapterNumber}:${ayahNum}`),
    1000)); // then scroll to it
  }

  handleLazyLoadAyahs = (callback) => {
    const { ayahIds, chapter, isEndOfSurah, options, actions } = this.props; // eslint-disable-line no-shadow, max-len
    const range = [this.getFirst(), this.getLast()];

    const size = 10;
    const from = range[1];
    const to = (from + size);

    if (!isEndOfSurah && !ayahIds.has(to)) {
      actions.ayah.load(chapter.chapterNumber, from, to, options).then(() => {
        this.setState({ lazyLoading: false });
        return callback && callback();
      });
    }

    return false;
  }

  handleSurahInfoToggle = (payload) => {
    const { actions } = this.props; // eslint-disable-line no-shadow

    return actions.options.setOption(payload);
  }

  title() {
    const { params, chapter } = this.props;

    if (params.range) {
      return `Surah ${chapter.name.simple} [${chapter.chapterNumber}:${params.range}]`;
    }

    return `Surah ${chapter.name.simple} [${chapter.chapterNumber}]`;
  }

  description() {
    const { params, ayahs, chapter } = this.props;

    if (params.range) {
      if (params.range.includes('-')) {
        const [from, to] = params.range.split('-').map(num => parseInt(num, 10));
        const array = Array(to - from).fill(from);
        const translations = array.map((fromAyah, index) => {
          const ayah = ayahs[`${chapter.chapterNumber}:${fromAyah + index}`];

          if (ayah && ayah.content && ayah.content[0]) {
            return ayah.content[0].text;
          }

          return '';
        });

        const content = translations.join(' - ').slice(0, 250);

        return `Surat ${chapter.name.simple} [verse ${params.range}] - ${content}`;
      }

      const ayah = ayahs[`${chapter.chapterNumber}:${params.range}`];

      if (ayah && ayah.content && ayah.content[0]) {
        return `Surat ${chapter.name.simple} [verse ${params.range}] - ${ayah.content[0].text}`;
      }

      return `Surat ${chapter.name.simple} [verse ${params.range}]`;
    }

    return `${chapter.info ? chapter.info.shortDescription : ''} This Surah has ${chapter.versesCount} ayahs and resides between pages ${chapter.page[0]} to ${chapter.page[1]} in the Quran.`; // eslint-disable-line max-len
  }

  renderPagination() {
    const { isSingleAyah, isLoading, isEndOfSurah, chapter } = this.props;

    // If single ayah, eh. /2/30
    if (isSingleAyah) {
      const to = this.getFirst() + 10 > chapter.versesCount ?
        chapter.versesCount :
        this.getFirst() + 10;

      return (
        <ul className="pager">
          <li className="text-center">
            <Link to={`/${chapter.chapterNumber}/${this.getFirst()}-${to}`}>
              <LocaleFormattedMessage id="chapter.index.continue" defaultMessage="Continue" />
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
            {
              chapter.chapterNumber > 1 &&
                <li className="previous">
                  <Link to={`/${(chapter.chapterNumber * 1) - 1}`}>
                    &larr;
                    <LocaleFormattedMessage
                      id="chapter.previous"
                      defaultMessage="Previous Surah"
                    />
                  </Link>
                </li>
            }
            <li className="text-center">
              <Link to={`/${chapter.chapterNumber}`}>
                <LocaleFormattedMessage
                  id="chapter.goToBeginning"
                  defaultMessage="Beginning of Surah"
                />
              </Link>
            </li>
            {
              chapter.chapterNumber < 114 &&
                <li className="next">
                  <Link to={`/${(chapter.chapterNumber * 1) + 1}`}>
                    <LocaleFormattedMessage
                      id="chapter.next"
                      defaultMessage="Next Surah"
                    />
                    &rarr;
                  </Link>
                </li>
            }
          </ul>
        }
        loadingComponent={<Loader />}
      />
    );
  }

  renderAyahs() {
    const {
      chapter,
      ayahs,
      actions,
      options,
      bookmarks,
      isPlaying,
      isAuthenticated,
      currentAyah,
    } = this.props; // eslint-disable-line no-shadow

    return Object.values(ayahs).map(ayah => (
      <Ayah
        ayah={ayah}
        chapter={chapter}
        currentAyah={currentAyah}
        isCurrentAyah={isPlaying && ayah.ayahKey === currentAyah}
        bookmarked={!!bookmarks[ayah.ayahKey]}
        tooltip={options.tooltip}
        bookmarkActions={actions.bookmark}
        audioActions={actions.audio}
        mediaActions={actions.media}
        isPlaying={isPlaying}
        isAuthenticated={isAuthenticated}
        key={`${ayah.surahId}-${ayah.ayahNum}-ayah`}
      />
    ));
  }

  renderLines() {
    const { lines, options, currentAyah, isPlaying, actions } = this.props;
    const keys = Object.keys(lines);

    return keys.map((lineNum, index) => {
      const nextNum = keys[index + 1];
      const pageNum = lineNum.split('-')[0];
      const line = lines[lineNum];

      if (index + 1 !== keys.length && pageNum !== nextNum.split('-')[0]) {
        return [
          <Line
            line={line}
            key={lineNum}
            currentAyah={currentAyah}
            tooltip={options.tooltip}
            audioActions={actions.audio}
            isPlaying={isPlaying}
          />,
          <PageBreak pageNum={parseInt(pageNum, 10) + 1} />
        ];
      }

      return (
        <Line
          line={line}
          key={lineNum}
          currentAyah={currentAyah}
          tooltip={options.tooltip}
          audioActions={actions.audio}
          isPlaying={isPlaying}
        />
      );
    });
  }

  render() {
    const { chapter, options, actions } = this.props; // eslint-disable-line no-shadow
    debug('component:Surah', 'Render');

    if (!this.hasAyahs()) return <div className={style.container} style={{ margin: '50px auto' }}><Loader /></div>;

    return (
      <div className="chapter-body">
        <Helmet
          {...makeHeadTags({
            title: this.title(),
            description: this.description()
          })}
          script={[{
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
                  "name": "${chapter.name.simple}"
                }
              }]
            }`
          }]}
          style={[
            {
              cssText: `.text-arabic{font-size: ${options.fontSize.arabic}rem;} .text-translation{font-size: ${options.fontSize.translation}rem;}` // eslint-disable-line max-len
            },
            {
              cssText: `@font-face {font-family: 'bismillah';
                src: url('//quran-1f14.kxcdn.com/fonts/ttf/bismillah.ttf') format('truetype')}
                .bismillah{font-family: 'bismillah'; font-size: 36px !important; color: #000; padding: 25px 0px;}` // eslint-disable-line max-len
            }
          ]}
        />
        <div className={`container-fluid ${style.container}`}>
          <div className="row">
            <SurahInfo
              chapter={chapter}
              loadInfo={actions.loadInfo}
              isShowingSurahInfo={options.isShowingSurahInfo}
              onClose={this.handleSurahInfoToggle}
            />
            <div className="col-md-10 col-md-offset-1">
              <TopOptions chapter={chapter} />
              <Bismillah chapter={chapter} />
              {options.isReadingMode ? this.renderLines() : this.renderAyahs()}
            </div>
            <div className="col-md-10 col-md-offset-1">
              {this.renderPagination()}
            </div>
          </div>
        </div>
        <Audioplayer
          chapter={chapter}
          onLoadAyahs={this.handleLazyLoadAyahs}
        />
      </div>
    );
  }
}

const AsyncSurah = asyncConnect([
  { promise: surahsConnect },
  { promise: surahInfoConnect },
  { promise: ayahsConnect }
])(Surah);

function mapStateToProps(state, ownProps) {
  const surahId = parseInt(ownProps.params.surahId, 10);
  const chapter: Object = state.chapters.entities[surahId];
  const ayahs: Object = state.ayahs.entities[surahId];
  const ayahArray = ayahs ? Object.keys(ayahs).map(key => parseInt(key.split(':')[1], 10)) : [];
  const ayahIds = new Set(ayahArray);
  const lastAyahInArray = ayahArray.slice(-1)[0];
  const isSingleAyah = !ownProps.params.range.includes('-');


  return {
    chapter,
    ayahs,
    ayahIds,
    isSingleAyah,
    isStarted: state.audioplayer.isStarted,
    isPlaying: state.audioplayer.isPlaying,
    currentAyah: state.audioplayer.currentAyah,
    isAuthenticated: state.auth.loaded,
    currentWord: state.ayahs.currentWord,
    isEndOfSurah: lastAyahInArray === chapter.versesCount,
    chapters: state.chapters.entities,
    bookmarks: state.bookmarks.entities,
    isLoading: state.ayahs.loading,
    isLoaded: state.ayahs.loaded,
    lines: state.lines.lines,
    options: state.options
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      options: bindActionCreators(OptionsActions, dispatch),
      ayah: bindActionCreators(AyahActions, dispatch),
      audio: bindActionCreators(AudioActions, dispatch),
      bookmark: bindActionCreators(BookmarkActions, dispatch),
      media: bindActionCreators(MediaActions, dispatch),
      push: bindActionCreators(push, dispatch)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncSurah);
