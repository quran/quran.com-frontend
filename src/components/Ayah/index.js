/* eslint-disable consistent-return */
import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { Element } from 'react-scroll';
import ReactDOM from 'react-dom'

import Copy from '../Copy';

import debug from '../../helpers/debug';

const styles = require('./style.scss');

const CHAR_TYPE_WORD   = 1;
const CHAR_TYPE_END    = 2;
const CHAR_TYPE_PAUSE  = 3;
const CHAR_TYPE_RUB    = 4;
const CHAR_TYPE_SAJDAH = 5;

export default class Ayah extends Component {
  static propTypes = {
    isSearched: PropTypes.bool,
    ayah: PropTypes.object.isRequired,
    match: PropTypes.array,
    currentWord: PropTypes.any, // gets passed in an integer, null by default
  };

  static defaultProps = {
    currentWord: null,
    isSearched: false,
  };

  shouldComponentUpdate(nextProps) {
    const conditions = [this.props.ayah !== nextProps.ayah, this.props.currentWord !== nextProps.currentWord];

    if (this.props.match) {
      conditions.push(this.props.match.length !== nextProps.match.length);
    }

    return  conditions.some(condition => condition);
  }

  renderTranslations() {
    const { ayah, match } = this.props;

    const array = match ? match : ayah.content || [];

    return array.map((content, index) => {
      const arabic = new RegExp(/[\u0600-\u06FF]/);
      const character = content.text;
      const isArabic = arabic.test(character);

      return (
        <div className={`${styles.translation} ${isArabic ? 'arabic' : ''} translation`} key={index}>
          <h4 className="montserrat">{content.name || content.resource.name}</h4>
          <h2 className={`${isArabic ? 'text-right' : 'text-left'} text-translation times-new`}>
            <small dangerouslySetInnerHTML={{__html: content.text}} className="times-new" />
          </h2>
        </div>
      );
    });
  }

  onWordClick(event) {
    if (event.target && /^word-/.test(event.target.id)) {
      // call onWordClick in Surah
      this.props.onWordClick(event.target.id.match(/\d+/g).join(':'));
    }
  }

  onWordFocus(event) {
    if (event.target && /^word-/.test(event.target.id)) {
      // call onWordFocus in Surah
      this.props.onWordFocus(event.target.id.match(/\d+/g).join(':'), event.target);
    }
  }

  renderText() {
    if (!this.props.ayah.words[0].code) {
      return;
    }
    const { currentWord } = this.props;

    let position = 0;
    let text = this.props.ayah.words.map(word => {
      let id = null;
      let active = word.charTypeId == CHAR_TYPE_WORD && currentWord === position ? true : false;
      let className = `${word.className}${word.highlight? ' '+word.highlight : ''}${active? ' '+ styles.active : ''}`;

      if (word.charTypeId == CHAR_TYPE_WORD) {
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
            onClick={this.onWordClick.bind(this)}
            onFocus={this.onWordFocus.bind(this)}
            className={`${className} pointer`}
            data-toggle="tooltip"
            data-trigger="hover" // NOTE #1: if we want to use the focus event to do something like show a translation in
            tabIndex="1"
            data-placement="top" title={tooltip}
            dangerouslySetInnerHTML={{__html: word.code}}
          />
        );
      }
      else {
        return (
          <b
            id={id}
            onClick={this.onWordClick.bind(this)}
            className={`${className} pointer`}
            key={word.code}
            dangerouslySetInnerHTML={{__html: word.code}}
          />
        );
      }
    });

    return (
      <h1 className={`${styles.font} text-right text-arabic`}>
        {text}
      </h1>
    );
  }

  goToAyah(ayah, e) {
    e.preventDefault();

    this.setState({
      open: false
    });
  }

  handleCopy = () => {
    const { ayah } = this.props;

    CopyToClipboard(ayah.textTashkeel);
  }

  renderPlayLink() {
    if (!this.props.isSearch) {
      <a onClick={this.goToAyah.bind(this, this.props.ayah.ayahNum)}
         className="text-muted">
        <i className="ss-icon ss-play" /> Play
      </a>
    }
  }

  renderCopyLink() {
    const { isSearch, ayah: { textTashkeel } } = this.props;

    if (!isSearch) {
      return (
        <Copy text={textTashkeel} />
      );
    }
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
          data-metrics-event-name="Ayah:Searched:Link">
          {content}
        </Link>
      );
    }

    return content;
  }

  shareDialog(href) {
    window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
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
    debug(`component:Ayah`, `Render ${this.props.ayah.ayahNum}`);

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

