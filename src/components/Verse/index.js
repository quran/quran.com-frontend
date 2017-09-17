import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';
import Element from 'react-scroll/lib/components/Element';
import Loadable from 'react-loadable';
import ComponentLoader from 'components/ComponentLoader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import Word from 'components/Word';
import Translation from 'components/Translation';
import debug from 'helpers/debug';

import { loadTafsirs } from 'redux/actions/media';

const styles = require('./style.scss');

const Copy = Loadable({
  loader: () => import('components/Copy'),
  LoadingComponent: ComponentLoader
});

const Share = Loadable({
  loader: () => import('components/Share'),
  LoadingComponent: ComponentLoader
});

class Verse extends Component {
  shouldComponentUpdate(nextProps) {
    const conditions = [
      this.props.verse !== nextProps.verse,
      this.props.bookmarked !== nextProps.bookmarked,
      this.props.tooltip !== nextProps.tooltip,
      this.props.currentWord !== nextProps.currentWord,
      this.props.iscurrentVerse !== nextProps.iscurrentVerse
    ];

    if (this.props.match) {
      conditions.push(this.props.match.length !== nextProps.match.length);
    }

    return conditions.some(condition => condition);
  }

  handlePlay(verse) {
    const { isPlaying, audioActions, iscurrentVerse } = this.props;
    const { pause, setAyah, play } = audioActions;

    if (isPlaying) {
      pause();
    }

    if (iscurrentVerse) {
      return;
    }

    setAyah(verse.verseKey);
    play();
  }

  renderTranslations() {
    const { verse, match } = this.props;
    const array = match || verse.translations || [];

    return array.map(translation => (
      <Translation
        translation={translation}
        index={translation.id}
        key={translation.id}
      />
    ));
  }

  renderMedia() {
    const { verse, mediaActions, isSearched, isPdf } = this.props;

    if (isSearched || !verse.mediaContents) return false;
    if (isPdf) return false;

    return (
      <div>
        {verse.mediaContents.map((content, index) => (
          <div className={`${styles.translation} translation`} key={index}>
            <h2 className="text-translation times-new">
              <small>
                <a
                  tabIndex="-1"
                  className="pointer"
                  onClick={() => mediaActions.setMedia(content)}
                  data-metrics-event-name="Media Click"
                  data-metrics-media-content-url={content.url}
                  data-metrics-media-content-id={content.id}
                  data-metrics-media-content-verse-key={verse.verseKey}
                >
                  <LocaleFormattedMessage
                    id="verse.media.lectureFrom"
                    defaultMessage="Watch lecture by {from}"
                    values={{ from: content.authorName }}
                  />
                </a>
              </small>
            </h2>
          </div>
        ))}
      </div>
    );
  }

  renderText() {
    const {
      verse,
      tooltip,
      currentVerse,
      isPlaying,
      audioActions,
      isSearched
    } = this.props; // eslint-disable-line max-len
    // NOTE: Some 'word's are glyphs (jeem). Not words and should not be clicked for audio
    let wordAudioPosition = -1;
    const renderText = false; // userAgent.isBot;

    const text = verse.words.map(word => (
      <Word
        word={word}
        key={`${word.position}-${word.code}-${word.lineNum}`}
        currentVerse={currentVerse}
        tooltip={tooltip}
        isPlaying={isPlaying}
        audioActions={audioActions}
        audioPosition={
          word.charType === 'word' ? (wordAudioPosition += 1) : null
        }
        isSearched={isSearched}
        useTextFont={renderText}
      />
    ));

    return (
      <h1 className={`${styles.font} text-right text-arabic`}>
        <p>{text}</p>
      </h1>
    );
  }

  renderPlayLink() {
    const { isSearched, verse, currentVerse, isPlaying, isPdf } = this.props;
    const playing = verse.verseKey === currentVerse && isPlaying;

    if (isPdf) return false;

    if (!isSearched) {
      return (
        <a
          tabIndex="-1"
          onClick={() => this.handlePlay(verse)}
          className="text-muted"
        >
          <i
            className={`ss-icon ${playing
              ? 'ss-pause'
              : 'ss-play'} vertical-align-middle`}
          />{' '}
          <LocaleFormattedMessage
            id={playing ? 'actions.pause' : 'actions.play'}
            defaultMessage={playing ? 'Pause' : 'Play'}
          />
        </a>
      );
    }

    return false;
  }

  renderTafsirLink() {
    const { verse } = this.props;

    return (
      <a
        tabIndex="-1"
        className="text-muted"
        onClick={() =>
          this.props.loadTafsirs(
            verse,
            <LocaleFormattedMessage
              id="tafsir.select"
              defaultMessage={'Select a tafsir'}
            />
          )}
      >
        <i className="ss-book vertical-align-middle" />{' '}
        <LocaleFormattedMessage
          id={'actions.tafsir'}
          defaultMessage={'Tafsir'}
        />
      </a>
    );
  }

  renderCopyLink() {
    const { isSearched, verse, isPdf } = this.props;

    if (isPdf) return false;

    if (!isSearched) {
      return <Copy text={verse.textMadani} verseKey={verse.verseKey} />;
    }

    return false;
  }

  renderBookmark() {
    const {
      verse,
      bookmarked,
      isAuthenticated,
      bookmarkActions,
      isSearched
    } = this.props;

    if (isSearched || !isAuthenticated) return false;

    if (bookmarked) {
      return (
        <a
          tabIndex="-1"
          onClick={() => bookmarkActions.removeBookmark(verse.verseKey)}
          className="text-muted"
        >
          <strong>
            <i className="ss-icon ss-bookmark vertical-align-middle" />{' '}
            <LocaleFormattedMessage
              id="verse.bookmarked"
              defaultMessage="Bookmarked"
            />
          </strong>
        </a>
      );
    }

    return (
      <a
        tabIndex="-1"
        onClick={() => bookmarkActions.addBookmark(verse.verseKey)}
        className="text-muted"
      >
        <i className="ss-icon ss-bookmark vertical-align-middle" />{' '}
        <LocaleFormattedMessage id="verse.bookmark" defaultMessage="Bookmark" />
      </a>
    );
  }

  renderBadge() {
    const { isSearched, verse } = this.props;
    const translations = (verse.translations || [])
      .map(translation => translation.resourceId)
      .join(',');
    let metric;

    const content = (
      <h4>
        <span className={`label label-default ${styles.label}`}>
          {verse.verseKey}
        </span>
      </h4>
    );

    if (isSearched) {
      metric = 'Verse:Searched:Link';
    } else {
      metric = 'Verse:Link';
    }

    return (
      <Link
        to={`/${verse.chapterId}/${verse.verseNumber}?translations=${translations}`}
        data-metrics-event-name={metric}
      >
        {content}
      </Link>
    );
  }

  renderShare() {
    const { isSearched, verse, chapter } = this.props;

    if (isSearched) return false;

    return <Share chapter={chapter} verse={verse} />;
  }

  renderControls() {
    const { isPdf } = this.props;

    return (
      <div className={`col-md-1 col-sm-1 ${styles.controls}`}>
        {this.renderBadge()}
        {this.renderPlayLink()}
        {this.renderCopyLink()}
        {this.renderTafsirLink()}
        {this.renderBookmark()}
        {!isPdf && this.renderShare()}
      </div>
    );
  }

  render() {
    const { verse, iscurrentVerse } = this.props;
    debug('component:Verse', `Render ${verse.verseKey}`);

    return (
      <Element
        name={`verse:${verse.verseKey}`}
        className={`row ${iscurrentVerse && 'highlight'} ${styles.container}`}
      >
        {this.renderControls()}
        <div className="col-md-11 col-sm-11">
          {this.renderText()}
          {this.renderTranslations()}
          {this.renderMedia()}
        </div>
      </Element>
    );
  }
}

Verse.propTypes = {
  isSearched: PropTypes.bool,
  verse: customPropTypes.verseType.isRequired,
  chapter: customPropTypes.surahType.isRequired,
  bookmarked: PropTypes.bool, // TODO: Add this for search
  bookmarkActions: customPropTypes.bookmarkActions,
  mediaActions: customPropTypes.mediaActions,
  audioActions: customPropTypes.audioActions,
  match: customPropTypes.match,
  isPlaying: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  tooltip: PropTypes.string,
  currentWord: PropTypes.number, // gets passed in an integer, null by default
  iscurrentVerse: PropTypes.bool,
  currentVerse: PropTypes.string,
  userAgent: PropTypes.object, // eslint-disable-line
  loadTafsirs: PropTypes.func.isRequired,
  isPdf: PropTypes.bool
};

Verse.defaultProps = {
  currentWord: null,
  isSearched: false,
  isPdf: false
};

export default connect(() => ({}), { loadTafsirs })(Verse);
