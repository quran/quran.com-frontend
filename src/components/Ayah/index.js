import React, { Component, PropTypes } from 'react';
import copy from 'copy-to-clipboard';
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

import debug from 'helpers/debug';

const style = require('./style.scss');

export default class Ayah extends Component {
  static propTypes = {
    ayah: PropTypes.object.isRequired
  }

  onAudioChange(ayah, event) {
    event.preventDefault();

    // this.setState({
    //   open: false
    // });
    // this.context.executeAction(AudioplayerActions.changeAyah, {
    //   ayah: ayah,
    //   shouldPlay: true
    // });
  }

  onCopy(text) {
    return copy(text);
  }

  translations() {
    const { ayah } = this.props;

    if (!ayah.content && ayah.match) {
      return ayah.match.map((content, index) => {
        const arabic = new RegExp(/[\u0600-\u06FF]/);
        const character = content.text;
        const flag = arabic.test(character);

        if (flag) {
          return (
            <div className={style.arabicTranslation} key={index}>
              <h4>{content.name}</h4>
              <h2 className="text-right">
                <small dangerouslySetInnerHTML={{__html: content.text}} />
              </h2>
           </div>
          );
        }

        return (
          <div className={style.translation} key={index}>
            <h4>{content.name}</h4>
            <h2 className="text-left">
              <small dangerouslySetInnerHTML={{__html: content.text}} />
            </h2>
          </div>
        );
      });
    }

    if (!ayah.content) {
      return [];
    }

    return ayah.content.map((content, index) => {
      return (
        <div className={style.translation} key={index}>
          <h4>{content.name}</h4>
          <h2 className="text-left">
            <small style={{fontSize: 19.5}}>{content.text}</small>
          </h2>
        </div>
      );
    });
  }

  text() {
    const { ayah } = this.props;

    if (!ayah.quran[0].char) {
      return false;
    }

    const text = ayah.quran.map(word => {
      if (word.word.translation) {
        const tooltip = (
          <Tooltip id={word.word.id}>
            <h4>
              {word.word.translation}
            </h4>
          </Tooltip>
        );

        return (
          <OverlayTrigger placement="top" overlay={tooltip} key={word.word.id} animation={false}>
            <b key={word.char.code}
              className={word.char.font}
              title={word.word.translation}
              dangerouslySetInnerHTML={{__html: word.char.code}}>
            </b>
          </OverlayTrigger>
        );
      }

      return (
        <b className={word.char.font}
           key={word.char.code}
           title={word.word.translation}
           dangerouslySetInnerHTML={{__html: word.char.code}}>
        </b>
      );
    });

    return (
      <h1 className={style.font} style={{fontSize: 49}}>
        {text}
      </h1>
    );
  }

  controls() {
    const { ayah } = this.props;

    return (
      <Col md={1} className={style.controls}>
        <h4>
          <span className={style.label}>
            {ayah.surahId}:{ayah.ayahNum}
          </span>
        </h4>
        <a onClick={this.onAudioChange.bind(this, ayah.ayahNum)}
           className="text-muted">
          <i className="ss-icon ss-play" /> Play
        </a>
        <a onClick={this.onCopy.bind(this, ayah.text)}
           className="text-muted">
          <i className="ss-icon ss-attach" /> Copy
        </a>
      </Col>
    );
  }

  render() {
    const { ayah } = this.props;

    debug(`Component:Ayah`, `Render ${ayah.ayahNum}`);

    return (
      <div className={`row ${style.ayah}`}>
        {this.controls()}
        <Col md={11}>
          {this.text()}
          {this.translations()}
        </Col>
      </div>
    );
  }
}
