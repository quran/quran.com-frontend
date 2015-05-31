import React from 'react';
import AudioplayerTracker from './AudioplayerTracker';
import $ from 'jquery';

class AudioplayerTrack extends React.Component {
  _moveTracker(e) {
    e.preventDefault();

    this.props.changeOffset(
      e.nativeEvent.offsetX /
      $(React.findDOMNode(this)).parent()[0].getBoundingClientRect().width
    );
  }

  render() {
    return (
      <div className="audioplayer-track" onClick={this._moveTracker}>
          <AudioplayerTracker progress={this.props.progress}/>
      </div>
    );
  }
}

export default AudioplayerTracker;
