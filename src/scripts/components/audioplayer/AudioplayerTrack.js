import React from 'react';
import ReactDOM from 'react-dom';
import AudioplayerTracker from './AudioplayerTracker';
import $ from 'jquery';

class AudioplayerTrack extends React.Component {
  moveTracker(e) {
    e.preventDefault();

    this.props.changeOffset(
      e.nativeEvent.offsetX /
      $(ReactDOM.findDOMNode(this)).parent()[0].getBoundingClientRect().width
    );
  }

  render() {
    return (
      <div className="audioplayer-track" onClick={this.moveTracker}>
          <AudioplayerTracker progress={this.props.progress}/>
      </div>
    );
  }
}

export default AudioplayerTracker;
