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
import Loader from 'quran-components/lib/Loader';
import LazyLoad from 'components/LazyLoad';
import PageBreak from 'components/PageBreak';
import Audioplayer from 'components/Audioplayer';
import SurahInfo from 'components/SurahInfo';
import Verse from 'components/Verse';
import Line from 'components/Line';
import Bismillah from 'components/Bismillah';
import TopOptions from 'components/TopOptions';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

// utils
import scroller from 'utils/scroller';

// Helpers
import makeHeadTags from 'helpers/makeHeadTags';
import debug from 'helpers/debug';

import { surahType, verseType } from 'types';

import * as AudioActions from 'redux/actions/audioplayer.js';
import * as AyahActions from 'redux/actions/verses.js';
import * as BookmarkActions from 'redux/actions/bookmarks.js';
import * as OptionsActions from 'redux/actions/options.js';
import * as MediaActions from 'redux/actions/media.js';

import { chaptersConnect, chapterInfoConnect, versesConnect } from './connect';

const LoaderStyle = { width: '10em', height: '10em' };

const style = require('./style.scss');

class Surah extends Component {
  static propTypes = {
    chapter: surahType.isRequired,
    chapters: PropTypes.objectOf(surahType).isRequired,
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
    verses: PropTypes.objectOf(verseType),
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
      this.props.isPlaying !== nextProps.isPlaying,
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

  hasAyahs() {
    return Object.keys(this.props.verses).length;
  }

  handleVerseDropdownClick = (verseNum) => {
    const { verseIds, chapter, actions } = this.props; // eslint-disable-line no-shadow

    actions.verse.setcurrentVerse(`${chapter.chapterNumber}:${verseNum}`);

    if (verseIds.has(verseNum)) {
      return false;
    }

    if (verseNum > (this.getLast() + 10) || verseNum < this.getFirst()) {
      // This is beyond lazy loading next page.
      if (actions.push) {
        return actions.push.push(`/${chapter.chapterNumber}/${verseNum}-${verseNum + 10}`);
      }
    }

    return this.handleLazyLoadAyahs(() => setTimeout(() =>
      scroller.scrollTo(`verse:${chapter.chapterNumber}:${verseNum}`),
    1000)); // then scroll to it
  }

  handleLazyLoadAyahs = (callback) => {
    const { verseIds, chapter, isEndOfSurah, options, actions } = this.props; // eslint-disable-line no-shadow, max-len
    const range = [this.getFirst(), this.getLast()];

    const size = 10;
    const from = range[1];
    const to = (from + size);

    if (!isEndOfSurah && !verseIds.has(to)) {
      actions.verse.load(chapter.chapterNumber, from, to, options).then(() => {
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
      return `Surah ${chapter.nameSimple} [${chapter.chapterNumber}:${params.range}]`;
    }

    return `Surah ${chapter.nameSimple} [${chapter.chapterNumber}]`;
  }

  description() {
    const { params, verses, chapter } = this.props;

    if (params.range) {
      if (params.range.includes('-')) {
        const [from, to] = params.range.split('-').map(num => parseInt(num, 10));
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
        return `Surat ${chapter.nameSimple} [verse ${params.range}] - ${verse.content[0].text}`;
      }

      return `Surat ${chapter.nameSimple} [verse ${params.range}]`;
    }

    return `${chapter.info ? chapter.info.shortDescription : ''} This Surah has ${chapter.versesCount} verses and resides between pages ${chapter.pages[0]} to ${chapter.pages[1]} in the Quran.`; // eslint-disable-line max-len
  }

  renderPagination() {
    const { isSingleAyah, isLoading, isEndOfSurah, chapter } = this.props;

    // If single verse, eh. /2/30
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
        loadingComponent={<Loader isActive={isLoading} style={LoaderStyle} />}
      />
    );
  }

  renderAyahs() {
    const {
      chapter,
      verses,
      actions,
      options,
      bookmarks,
      isPlaying,
      isAuthenticated,
      currentVerse,
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
      />
    ));
  }

  renderLines() {
    const { lines, options, currentVerse, isPlaying, actions } = this.props;
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
            currentVerse={currentVerse}
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
          currentVerse={currentVerse}
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

    if (!this.hasAyahs()) return <div className={style.container} style={{ margin: '50px auto' }}><Loader isActive style={LoaderStyle} /></div>;

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
                  "name": "${chapter.nameSimple}"
                }
              }]
            }`
          }]}
          style={[
            {
              cssText: `.text-arabic{font-size: ${options.fontSize.arabic}rem;} .text-translation{font-size: ${options.fontSize.translation}rem;}` // eslint-disable-line max-len
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
  { promise: chaptersConnect },
  { promise: chapterInfoConnect },
  { promise: versesConnect }
])(Surah);

function mapStateToProps(state, ownProps) {
  const chapterId = parseInt(ownProps.params.chapterId, 10);
  const chapter: Object = state.chapters.entities[chapterId];
  const verses: Object = state.verses.entities[chapterId];
  const verseArray = verses ? Object.keys(verses).map(key => parseInt(key.split(':')[1], 10)) : [];
  const verseIds = new Set(verseArray);
  const lastAyahInArray = verseArray.slice(-1)[0];
  const isSingleAyah = !!ownProps.params.range && !ownProps.params.range.includes('-');


  return {
    chapter,
    verses,
    verseIds,
    isSingleAyah,
    isStarted: state.audioplayer.isStarted,
    isPlaying: state.audioplayer.isPlaying,
    currentVerse: state.audioplayer.currentVerse,
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncSurah);
