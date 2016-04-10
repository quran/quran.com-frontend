/* eslint-disable consistent-return */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Element } from 'react-scroll';

import Copy from '../Copy';

import debug from 'utils/Debug';

export default class Ayah extends Component {
  static propTypes = {
    isSearched: PropTypes.bool,
    ayah: PropTypes.object
  };

  static defaultProps = {
    isSearched: false,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.ayah !== nextProps.ayah;
  }

  renderTranslations() {
    if (!this.props.ayah.content && this.props.ayah.match) {
      return this.props.ayah.match.map((content, i) => {
        var arabic = new RegExp(/[\u0600-\u06FF]/);
        var character = content.text;
        var flag = arabic.test(character);

        if(flag){
          return (
            <div className="translation-arabic" key={i}>
              <h4>{content.name}</h4>
              <h2 className="text-left-arabic text-translation">
                <small dangerouslySetInnerHTML={{__html: content.text}} />
              </h2>
           </div>
          );
        }
        else {
          return (
            <div className="translation" key={i}>
              <h4>{content.name}</h4>
              <h2 className="text-left text-translation">
                <small dangerouslySetInnerHTML={{__html: content.text}} />
              </h2>
            </div>
          );
        }
      });
    }

    if (!this.props.ayah.content) {
      return [];
    }

    return this.props.ayah.content.map((content, index) => {
      return (
        <div className="translation" key={index}>
          <h4>{content.resource.name}</h4>
          <h2 className="text-left text-translation">
            <small>{content.text}</small>
          </h2>
        </div>
      );
    });
  }

  renderText() {
    if (!this.props.ayah.words[0].codeHex) {
      return;
    }

    let text = this.props.ayah.words.map(word => {
      let className = `${word.className} ${word.highlight ? word.highlight: null}`;

      if (word.translation) {
        let tooltip = word.translation;

        if (this.props.isSearch) {
          return (
            <Link key={word.codeHex}
               className={className}
               data-toggle="tooltip"
               data-placement="top" title={tooltip}
               to={`/search?q=${word.word.arabic}&p=1`}
               dangerouslySetInnerHTML={{__html: word.codeHex}}/>
          );
        }

        return (
          <b
            key={word.codeHex}
            className={`${className} pointer`}
            data-toggle="tooltip"
            data-placement="top" title={tooltip}
            dangerouslySetInnerHTML={{__html: word.codeHex}}
          />
        );
      }
      else {
        return (
          <b
            className={`${className} pointer`}
            key={word.codeHex}
            dangerouslySetInnerHTML={{__html: word.codeHex}}
          />
        );
      }
    });

    return (
      <h1 className="word-font text-right text-arabic">
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
        <span className="label label-default">
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
      <div className="col-md-1 left-controls">
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
      <Element name={`ayah:${ayah.ayahNum}`} className={`row ayah`}>
        {this.renderControls()}
        <div className="col-md-11">
          {this.renderText()}
          {this.renderTranslations()}
        </div>
      </Element>
    );
  }
}
