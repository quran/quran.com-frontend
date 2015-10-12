/* eslint-disable consistent-return */

import React from 'react';
import * as AudioplayerActions from 'actions/AudioplayerActions';
import CopyToClipboard from 'copy-to-clipboard';
import {NavLink} from 'fluxible-router';

import debug from 'utils/Debug';

class Ayah extends React.Component {
  translations() {
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

  text() {
    if (!this.props.ayah.quran[0].char) {
      return;
    }

    let text = this.props.ayah.quran.map(word => {
      let className = `${word.char.font} ${word.highlight ? word.highlight: null}`;

      if (word.word.translation) {
        let tooltip = word.word.translation;

        return (
          <b key={word.char.code}
             className={className}
             data-toggle="tooltip"
             data-placement="top" title={tooltip}
             dangerouslySetInnerHTML={{__html: word.char.code}} />
        );
      }
      else {
        return (
          <b className={className}
             key={word.char.code}
             dangerouslySetInnerHTML={{__html: word.char.code}} />
        );
      }
    });

    if (this.props.readingMode) {
      return (
        <span>
          {text}
        </span>
      );
    }

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
    this.context.executeAction(AudioplayerActions.changeAyah, {
      ayah: ayah,
      shouldPlay: true
    });
  }

  onCopy(text) {
    CopyToClipboard(text);
  }

  playLink() {
    if (!this.props.isSearch) {
      <a onClick={this.goToAyah.bind(this, this.props.ayah.ayah_num)}
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

        <NavLink href={`/${this.props.ayah.surah_id}/${this.props.ayah.ayah_num}`} style={{fontSize: 18}}>
          <span className="label label-default">
            {this.props.ayah.surah_id}:{this.props.ayah.ayah_num}
          </span>
        </NavLink>
      )
    }
    else {
      return (
        <h4>
          <span className="label label-default">
            {this.props.ayah.surah_id}:{this.props.ayah.ayah_num}
          </span>
        </h4>
      );
    }
  }

  leftControls() {
    return (
      <div className="col-md-1 left-controls">
        {this.ayahBadge()}
        {this.playLink()}
        {this.copyLink()}
      </div>
    );
  }

  render() {
    debug(`COMPONENT-AYAH RENDERED ${this.props.ayah.ayah_num}`);

    if (this.props.readingMode) {
      return this.text();
    }

    return (
      <div className="row ayah">
        {this.leftControls()}
        <div className="col-md-11">
          {this.text()}
          {this.translations()}
        </div>
      </div>
    );
  }
}

Ayah.displayName = 'Ayah';

Ayah.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

Ayah.propTypes = {
  ayah: React.PropTypes.object.isRequired
};

export default Ayah;
