import React from 'react';
import * as AudioplayerActions from 'actions/AudioplayerActions';
import ReactZeroClipboard from 'react-zeroclipboard';
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
  };

  text() {
    if (!this.props.ayah.quran[0].char) {
      return;
    }

    let text =  this.props.ayah.quran.map((word) => {
      if (word.word.translation) {
        let tooltip = word.word.translation;
        return (
          <b key={word.char.code}
             className={word.char.font}
             data-toggle="tooltip"
             data-placement="top" title={tooltip}
             dangerouslySetInnerHTML={{__html: word.char.code}}>
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
  };

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
          <i className="ss-icon ss-play" /> Play
        </a>
        <ReactZeroClipboard text={this.props.ayah.text} className="text-muted">
          <a className="text-muted">
            <i className="ss-icon ss-attach" /> Copy
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

Ayah.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

Ayah.propTypes = {
  ayah: React.PropTypes.object.isRequired
};

export default Ayah;
