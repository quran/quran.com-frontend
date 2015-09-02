/* eslint-disable consistent-return */

import React from 'react';
import * as AudioplayerActions from 'actions/AudioplayerActions';
import ReactZeroClipboard from 'react-zeroclipboard';
import debug from 'utils/Debug';

class Line extends React.Component {
  //componentDidMount() {
  //  console.log( 'im line', window );
  //}

  text() {
    if (!this.props.line[0].char) { // TODO shouldn't be possible, remove this clause
      return;
    }

    let text = this.props.line.map(data => {
      if (data.word.translation) {
        let tooltip = data.word.translation;

        return (
          <b key={data.char.code}
             className={data.char.font}
             data-toggle="tooltip"
             data-placement="top" title={tooltip}
             dangerouslySetInnerHTML={{__html: data.char.code}}>
          </b>
        );
      }
      else {
        return (
          <b className={data.char.font}
             key={data.char.code}
             dangerouslySetInnerHTML={{__html: data.char.code}}>
          </b>
        );
      }
    });

    return (
      <span className="line">
        {text}
      </span>
    );

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
    debug(`COMPONENT-LINE RENDERED page ${this.props.line[0].char.page}, line ${this.props.line[0].char.line}, ayah ${this.props.line[0].ayah_key}`);

    return this.text();

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

Line.displayName = 'Line';

Line.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

Line.propTypes = {
  line: React.PropTypes.object.isRequired
};

export default Line;
