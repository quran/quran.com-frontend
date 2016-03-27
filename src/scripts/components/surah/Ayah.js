/* eslint-disable consistent-return */
import React, { Component } from 'react';
import CopyToClipboard from 'copy-to-clipboard';
import { Link } from 'react-router';
import { I13nAnchor } from 'react-i13n';
import { Element } from 'react-scroll';

import debug from 'utils/Debug';

export default class Ayah extends Component {
  static defaultProps = {
    isSearch: false,
    isReadingMode: false
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
              <h2 className="text-left-arabic">
                <small dangerouslySetInnerHTML={{__html: content.text}} />
              </h2>
           </div>
          );
        }
        else {
          return (
            <div className="translation" key={i}>
              <h4>{content.name}</h4>
              <h2 className="text-left">
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

    return this.props.ayah.content.map((content, i) => {
      return (
        <div className="translation" key={i}>
          <h4>{content.name}</h4>
          <h2 className="text-left">
            <small>{content.text}</small>
          </h2>
        </div>
      );
    });
  }

  renderText() {
    if (!this.props.ayah.quran[0].char) {
      return;
    }

    let text = this.props.ayah.quran.map(word => {
      let className = `${word.char.font} ${word.highlight ? word.highlight: null}`;

      if (word.word.translation) {
        let tooltip = word.word.translation;

        if (this.props.isSearch) {
          return (
            <Link key={word.char.code}
               className={className}
               data-toggle="tooltip"
               data-placement="top" title={tooltip}
               to={`/search?q=${word.word.arabic}&p=1`}
               dangerouslySetInnerHTML={{__html: word.char.code}}/>
          );
        }

        return (
          <b
            key={word.char.code}
            className={`${className} pointer`}
            data-toggle="tooltip"
            data-placement="top" title={tooltip}
            dangerouslySetInnerHTML={{__html: word.char.code}}
          />
        );
      }
      else {
        return (
          <b
            className={`${className} pointer`}
            key={word.char.code}
            dangerouslySetInnerHTML={{__html: word.char.code}}
          />
        );
      }
    });

    return (
      <h1 className="word-font text-right">
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

  onCopy(text) {
    CopyToClipboard(text);
  }

  playLink() {
    if (!this.props.isSearch) {
      <a onClick={this.goToAyah.bind(this, this.props.ayah.ayahNum)}
         className="text-muted">
        <i className="ss-icon ss-play" /> Play
      </a>
    }
  }

  copyLink() {
    if (!this.props.isSearch) {
      return (
        <a onClick={this.onCopy.bind(this, this.props.ayah.text)}
           className="text-muted">
          <i className="ss-icon ss-attach" /> Copy
        </a>
      );
    }
  }

  ayahBadge() {
    if (this.props.isSearch) {
      return (

        <Link to={`/${this.props.ayah.surahId}/${this.props.ayah.ayahNum}`} style={{fontSize: 18}}>
          <span className="label label-default">
            {this.props.ayah.surahId}:{this.props.ayah.ayahNum}
          </span>
        </Link>
      )
    }
    else {
      return (
        <h4>
          <span className="label label-default">
            {this.props.ayah.surahId}:{this.props.ayah.ayahNum}
          </span>
        </h4>
      );
    }
  }

  shareDialog(href) {
    window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
  }

  renderControls() {
    return (
      <div className="col-md-1 left-controls">
        {this.ayahBadge()}
        {this.playLink()}
        {this.copyLink()}
      </div>
    );
  }

  render() {
    const { ayah } = this.props;
    debug(`component:Ayah`, `Render ${this.props.ayah.ayahNum}`);

    if (this.props.isReadingMode) {
      return this.renderText();
    }

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
