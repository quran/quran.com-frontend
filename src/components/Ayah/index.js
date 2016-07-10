import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { Element } from 'react-scroll';

import Copy from '../Copy';

import debug from '../../helpers/debug';

const styles = require('./style.scss');

const CHAR_TYPE_WORD = 1;
const CHAR_TYPE_END = 2; // eslint-disable-line no-unused-vars
const CHAR_TYPE_PAUSE = 3; // eslint-disable-line no-unused-vars
const CHAR_TYPE_RUB = 4; // eslint-disable-line no-unused-vars
const CHAR_TYPE_SAJDAH = 5; // eslint-disable-line no-unused-vars

export default class Ayah extends Component {
  static propTypes = {
    isSearched: PropTypes.bool,
    ayah: PropTypes.object.isRequired,
    match: PropTypes.array,
    isSearch: PropTypes.bool,
    tooltip: PropTypes.string,
    currentWord: PropTypes.any, // gets passed in an integer, null by default
    onWordClick: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
  };

  static defaultProps = {
    currentWord: null,
    isSearched: false
  };

  shouldComponentUpdate(nextProps) {
    const conditions = [
      this.props.ayah !== nextProps.ayah,
      this.props.tooltip !== nextProps.tooltip,
      this.props.currentWord !== nextProps.currentWord
    ];

    if (this.props.match) {
      conditions.push(this.props.match.length !== nextProps.match.length);
    }

    return conditions.some(condition => condition);
  }

  handlePlay(ayah) {

    const {stop, setAyah, start} = this.props.actions;

    stop();
    setAyah(ayah);
    start();

  }

  renderTranslations() {
    const { ayah, match } = this.props;

    const array = match || ayah.content || [];

    return array.map((content, index) => {
      const arabic = new RegExp(/[\u0600-\u06FF]/);
      const character = content.text;
      const isArabic = arabic.test(character);

      return (
        <div
          className={`${styles.translation} ${isArabic && 'arabic'} translation`}
          key={index}
        >
          <h4 className="montserrat">{content.name || content.resource.name}</h4>
          <h2 className={`${isArabic ? 'text-right' : 'text-left'} text-translation times-new`}>
            <small dangerouslySetInnerHTML={{__html: content.text}} className="times-new" />
          </h2>
        </div>
      );
    });
  }

  renderText() {
    const { ayah, onWordClick, tooltip } = this.props;

    if (!ayah.words[0].code) {
      return false;
    }

    // position is important as it will differentiate between words and symbols, see 2:25:13
    let position = -1;
    let text = ayah.words.map(word => {
      let id = null;
      const className = `${word.className} ${word.highlight && word.highlight}`;

      if (word.charTypeId === CHAR_TYPE_WORD) {
        position = position + 1;
        id = `word-${word.ayahKey.replace(/:/, '-')}-${position}`;
      } else {
        id = `${word.className}-${word.codeDec}`; // just don't include id
      }

      if (word.translation || word.transliteration) {
        let tooltipContent = word[tooltip];

        return (
          <b
            key={word.code}
            id={id}
            onClick={(event) => onWordClick(event.target.dataset.key)}
            data-key={`${word.ayahKey}:${position}`}
            className={`${className} pointer`}
            data-toggle="tooltip"
            data-trigger="hover"
            data-placement="top"
            data-original-title={tooltipContent}
            title={tooltipContent}
            dangerouslySetInnerHTML={{__html: word.code}}
          />
        );
      }

      return (
        <b
          id={id}
          onClick={(event) => onWordClick(event.target.dataset.key)}
          data-key={`${word.ayahKey}:${position}`}
          className={`${className} pointer`}
          key={word.code}
          dangerouslySetInnerHTML={{__html: word.code}}
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
    const { isSearch, ayah } = this.props;

    if (!isSearch) {
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
      <div className={`col-md-1 ${styles.controls}`}>
        {this.renderAyahBadge()}
        {this.renderPlayLink()}
        {this.renderCopyLink()}
      </div>
    );
  }

  render() {
    const { ayah } = this.props;
    debug('component:Ayah', `Render ${this.props.ayah.ayahNum}`);

    return (
      <Element name={`ayah:${ayah.ayahKey}`} className={`row ${styles.container}`}>
        {this.renderControls()}
        <div className="col-md-11">
          {this.renderText()}
          {this.renderTranslations()}
        </div>
      </Element>
    );
  }
}
