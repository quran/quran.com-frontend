'use strict';

import React from 'react';
// import AudioplayerActions from 'actions/AudioplayerActions';
import ReactZeroClipboard from 'react-zeroclipboard';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import debug from 'utils/Debug';

class Ayah extends React.Component {
  translations() {
    if (!this.props.ayah.content && this.props.ayah.match) {
      return this.props.ayah.match.best.map((content, i) => {
        return (
          <div className="translation" key={i}>
            <h4>{content.name}</h4>
            <h2 className="text-left">
              <small dangerouslySetInnerHTML={{__html: content.text}} />
            </h2>
          </div>
        );
      });
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

  readingModeText() {}

  text() {
    if (!this.props.ayah.quran[0].char) {
      return;
    }

    let text =  this.props.ayah.quran.map((word) => {
      if (word.word.translation) {
        let tooltip = <Tooltip key={word.char.code}>{word.word.translation}</Tooltip>;
        return (
          <b key={word.char.code}>
            <OverlayTrigger placement="top"
                            overlay={tooltip}>
              <b className={word.char.font}
               dangerouslySetInnerHTML={{__html: word.char.code}}>
              </b>
            </OverlayTrigger>
          </b>
        );
      } else {
        return (
          <b className={word.char.font}
             key={word.char.code}
             dangerouslySetInnerHTML={{__html: word.char.code}}>
          </b>
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
    // AudioplayerActions.changeAyah(this.context.dispatcher, ayah, true);
  }

  leftControls() {
    return (
      <div className="col-md-1 left-controls">
        <h4>
          <span className="label label-default">
            {this.props.ayah.surah_id}:{this.props.ayah.ayah}
          </span>
        </h4>
        <a onClick={this.goToAyah.bind(this, this.props.ayah.ayah)}
                className="text-muted">
          <i className="fa fa-play" /> Play
        </a>
        <ReactZeroClipboard text={this.props.ayah.text} className="text-muted">
          <a className="text-muted">
            <i className="fa fa-clipboard" /> Copy
          </a>
        </ReactZeroClipboard>
      </div>
    );
  }

  render() {
    debug(`COMPONENT-AYAH RENDERED ${this.props.ayah.ayah}`)
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

Ayah.propTypes = {
  ayah: React.PropTypes.object.isRequired
};

export default Ayah;
