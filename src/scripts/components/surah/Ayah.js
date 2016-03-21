/* eslint-disable consistent-return */

import React from 'react';
import ReactDOM from 'react-dom';
import * as AudioplayerActions from 'actions/AudioplayerActions';
import CopyToClipboard from 'copy-to-clipboard';
import { Link } from 'react-router';
import debug from 'utils/Debug';
import { I13nAnchor } from 'react-i13n';

class Ayah extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fbShareLink: `https://www.facebook.com/sharer/sharer.php?u=http://www.quran.com/${props.ayah.surah_id}/${props.ayah.ayah_num}&t=${props.ayah.text}`,
      twShareLink: `http://www.twitter.com/intent/tweet?url=http://www.quran.com/${props.ayah.surah_id}/${props.ayah.ayah_num}&text=Quran.com ${props.ayah.surah_id}:${props.ayah.ayah_num} ${props.ayah.text}`
    };
  }
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

        <Link to={`/${this.props.ayah.surah_id}/${this.props.ayah.ayah_num}`} style={{fontSize: 18}}>
          <span className="label label-default">
            {this.props.ayah.surah_id}:{this.props.ayah.ayah_num}
          </span>
        </Link>
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

  shareDialog(href) {
    window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
  }

  leftControls() {
    return (
      <div className="col-md-1 left-controls">
        {this.ayahBadge()}
        {this.playLink()}
        {this.copyLink()}
        <I13nAnchor href={this.state.fbShareLink}
          i13nModel={{category: 'social', action: 'click'}}
          onClick={this.shareDialog.bind(this, this.state.fbShareLink)}
          target="_blank" title="Share on Facebook"
          className="text-muted">
          Facebook
        </I13nAnchor>
        <I13nAnchor href={this.state.twShareLink}
          i13nModel={{category: 'social', action: 'click'}}
          onClick={this.shareDialog.bind(this, this.state.twShareLink)}
          target="_blank" title="Share on Twitter"
          className="text-muted">
          Twitter
        </I13nAnchor>

      </div>
    );
  }

  render() {
    debug(`component:Ayah`, `Render ${this.props.ayah.ayah_num}`);

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
