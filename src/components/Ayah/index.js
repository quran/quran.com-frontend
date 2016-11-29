import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { Element } from 'react-scroll';

import Copy from '../Copy';

import debug from '../../helpers/debug';

import bindTooltip from '../../utils/bindTooltip';

const styles = require('./style.scss');

/* eslint-disable no-unused-vars */
const CHAR_TYPE_WORD = 1;
const CHAR_TYPE_END = 2;
const CHAR_TYPE_PAUSE = 3;
const CHAR_TYPE_RUB = 4;
const CHAR_TYPE_SAJDAH = 5;
/* eslint-enable no-unused-vars */

export default class Ayah extends Component {
  static propTypes = {
    isSearched: PropTypes.bool,
    ayah: PropTypes.object.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    bookmarkActions: PropTypes.object,
    mediaActions: PropTypes.object.isRequired,
    match: PropTypes.array,
    isSearch: PropTypes.bool,
    isPlaying: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    tooltip: PropTypes.string,
    currentWord: PropTypes.any, // gets passed in an integer, null by default
    audioActions: PropTypes.object.isRequired
  };

  static defaultProps = {
    currentWord: null,
    isSearched: false
  };

  componentDidMount() {
    bindTooltip();
  }

  shouldComponentUpdate(nextProps) {
    const conditions = [
      this.props.ayah !== nextProps.ayah,
      this.props.bookmarked !== nextProps.bookmarked,
      this.props.tooltip !== nextProps.tooltip,
      this.props.currentWord !== nextProps.currentWord
    ];

    if (this.props.match) {
      conditions.push(this.props.match.length !== nextProps.match.length);
    }

    return conditions.some(condition => condition);
  }

  handlePlay(ayah) {
    const { isPlaying, audioActions } = this.props;
    const { pause, setAyah, play } = audioActions;

    if (isPlaying) {
      pause();
    }
    setAyah(ayah);
    play();
  }

  renderTranslations() {
    const { ayah, match } = this.props;

    const array = match || ayah.content || [];

    return array.map((content, index) => {
      const arabic = new RegExp(/[\u0600-\u06FF]/);
      const character = content.text;
      const isArabic  = arabic.test(character);
      const lang      = (content.name || content.resource.name).replace(/\s+/g, '-').toLowerCase();

      return (
        <div
          className={`${styles.translation} ${isArabic && 'arabic'} translation`}
          key={index}
        >
          <h4 className="montserrat">{content.name || content.resource.name}</h4>
          <h2 className={`${isArabic ? 'text-right' : 'text-left'} text-translation times-new`}>
            <small dangerouslySetInnerHTML={{__html: content.text}} className={`${styles[lang] || 'times-new'}`} />
          </h2>
        </div>
      );
    });
  }

  renderMedia() {
    const { ayah, mediaActions } = this.props;

    if (!ayah.mediaContent.length) return false;

    return (
      <div>
        {
          ayah.mediaContent.map((content, index) => (
            <div
              className={`${styles.translation} translation`}
              key={index}
            >
              <h2 className="text-translation times-new">
                <small>
                  <a
                    className="pointer"
                    onClick={() => mediaActions.setMedia(content)}
                    data-metrics-event-name="Media Click"
                    data-metrics-media-content-url={content.url}
                    data-metrics-media-content-id={content.id}
                    data-metrics-media-content-ayah-key={ayah.ayahKey}
                  >
                    Watch lecture by {content.resource.name}
                  </a>
                </small>
              </h2>
            </div>
          ))
        }
      </div>
    );
  }

  renderText() {
    const { ayah, audioActions: { setCurrentWord }, tooltip } = this.props;

    if (!ayah.words[0].code) {
      return false;
    }

    // position is important as it will differentiate between words and symbols, see 2:25:13
    let position = -1;
    const text = ayah.words.map((word, index) => {
      let id = null;
      const isLast = ayah.words.length === index + 1;
      const className = `${word.className} ${word.highlight ? word.highlight : ''}`;

      if (word.charTypeId === CHAR_TYPE_WORD) {
        position = position + 1;
        id = `word-${word.ayahKey.replace(/:/, '-')}-${position}`;
      } else {
        id = `${word.className}-${word.codeDec}`; // just don't include id
      }

      if (word.translation || word.transliteration) {
        const tooltipContent = word[tooltip];

        return (
          <b
            key={word.code}
            id={id}
            rel="tooltip"
            onClick={(event) => setCurrentWord(event.target.dataset.key)}
            data-key={`${word.ayahKey}:${position}`}
            className={`${className}`}
            title={tooltipContent}
            dangerouslySetInnerHTML={{__html: word.code}}
          />
        );
      }

      const label = isLast ? {'title': `Verse ${ayah.ayahNum}`} : {}
      return (
        <b
          id={id}
          onClick={(event) => setCurrentWord(event.target.dataset.key)}
          data-key={`${word.ayahKey}:${position}`}
          rel="tooltip"
          className={`${className} ${isLast} pointer`}
          key={word.code}
          dangerouslySetInnerHTML={{__html: word.code}}
          {...label}
        />
      );
    });

    return (
      <h1 className={`${styles.font} text-right text-arabic`}>
        {text}
        <p
          dir="rtl"
          lang="ar"
          className={`text-tashkeel text-p${ayah.pageNum}`}
          dangerouslySetInnerHTML={{__html: ayah.textTashkeel}}
        />
      </h1>
    );
  }

  renderPlayLink() {
    const { isSearched, ayah } = this.props;

    if (!isSearched) {
      return (
        <a
          onClick={() => this.handlePlay(ayah.ayahKey)}
          className="text-muted"
        >
          <i className="ss-icon ss-play" /> Play
        </a>
      );
    }

    return false;
  }

  renderCopyLink() {
    const { isSearched, ayah: { textTashkeel } } = this.props;

    if (!isSearched) {
      return (
        <Copy text={textTashkeel} />
      );
    }

    return false;
  }

  renderBookmark() {
    const { ayah, bookmarked, isAuthenticated, bookmarkActions } = this.props;

    if (!isAuthenticated) return false;

    if (bookmarked) {
      return (
        <a
          onClick={() => bookmarkActions.removeBookmark(ayah.ayahKey)}
          className="text-muted"
        >
          <strong><i className="ss-icon ss-bookmark" /> Bookmarked</strong>
        </a>
      );
    }

    return (
      <a
        onClick={() => bookmarkActions.addBookmark(ayah.ayahKey)}
        className="text-muted"
      >
        <i className="ss-icon ss-bookmark" /> Bookmark
      </a>
    );
  }

  renderAyahBadge() {
    const { isSearched } = this.props;
    const content = (
      <h4>
        <span className={`label label-default ${styles.label}`}>
          {this.props.ayah.surahId}:{this.props.ayah.ayahNum}
        </span>
      </h4>
    );

    if (isSearched) {
      return (
        <Link
          to={`/${this.props.ayah.surahId}/${this.props.ayah.ayahNum}`}
          data-metrics-event-name="Ayah:Searched:Link"
        >
          {content}
        </Link>
      );
    }

    return (
      <Link
        to={`/${this.props.ayah.surahId}:${this.props.ayah.ayahNum}`}
        data-metrics-event-name="Ayah:Link"
      >
        {content}
      </Link>);
  }

  renderControls() {
    return (
      <div className={`col-md-2 col-sm-2 ${styles.controls}`}>
        {this.renderAyahBadge()}
        {this.renderPlayLink()}
        {this.renderCopyLink()}
        {this.renderBookmark()}
      </div>
    );
  }

  render() {
    const { ayah } = this.props;
    debug('component:Ayah', `Render ${this.props.ayah.ayahNum}`);

    return (
      <Element name={`ayah:${ayah.ayahKey}`} className={`row ${styles.container}`}>
        {this.renderControls()}
        <div className="col-md-10 col-sm-10">
          {this.renderText()}
          {this.renderTranslations()}
          {this.renderMedia()}
        </div>
      </Element>
    );
  }
}
