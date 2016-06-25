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
    currentWord: PropTypes.any, // gets passed in an integer, null by default
    onWordFocus: PropTypes.func,
    onWordClick: PropTypes.func
  };

  static defaultProps = {
    currentWord: null,
    isSearched: false,
  };

  shouldComponentUpdate(nextProps) {
    const conditions = [
      this.props.ayah !== nextProps.ayah,
      this.props.currentWord !== nextProps.currentWord
    ];

    if (this.props.match) {
      conditions.push(this.props.match.length !== nextProps.match.length);
    }

    return conditions.some(condition => condition);
  }

  handleWordClick = (event) => {
    if (event.target && /^word-/.test(event.target.id)) {
      // call onWordClick in Surah
      this.props.onWordClick(event.target.id.match(/\d+/g).join(':'));
    }
  }

  handleWordFocus = (event) => {
    if (event.target && /^word-/.test(event.target.id)) {
      // call onWordFocus in Surah
      this.props.onWordFocus(event.target.id.match(/\d+/g).join(':'), event.target);
    }
  }

  handlePlay() {
    this.setState({
      open: false
    });
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
    const { ayah, currentWord } = this.props;

    if (!ayah.words[0].code) {
      return false;
    }

    let position = 0;
    let text = ayah.words.map(word => {
      let id = null;
      const active = word.charTypeId === CHAR_TYPE_WORD && currentWord === position;
      const className = `${word.className} ${word.highlight && word.highlight} ${active && styles.active}`; // eslint-disable-line max-len

      if (word.charTypeId === CHAR_TYPE_WORD) {
        id = `word-${word.ayahKey.replace(/:/, '-')}-${position++}`;
      } else {
        id = `${word.className}-${word.codeDec}`; // just don't include id
      }

      if (word.translation) {
        let tooltip = word.translation;

        return (
          <b
            key={word.code}
            id={id}
            onClick={this.handleWordClick}
            // onFocus={this.handleWordFocus}
            className={`${className} pointer`}
            data-toggle="tooltip"
            data-trigger="hover"
            // tabIndex="1" <-- disable word focus
            data-placement="top" title={tooltip}
            dangerouslySetInnerHTML={{__html: word.code}}
          />
        );
      }

      return (
        <b
          id={id}
          onClick={this.handleWordClick}
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
          onClick={() => this.handlePlay(ayah.ayahNum)}
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

    return content;
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
      <Element name={`ayah:${ayah.ayahNum}`} className={`row ${styles.container}`}>
        {this.renderControls()}
        <div className="col-md-11">
          {this.renderText()}
          {this.renderTranslations()}
        </div>
      </Element>
    );
  }
}
