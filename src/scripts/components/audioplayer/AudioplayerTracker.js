'use strict';

import React from 'react';
import $ from 'jquery';

class AudioplayerTracker extends React.Component {
  componentWillReceiveProps(nextProps) {
    var $element = $(React.findDOMNode(this));

    $element.css(
      'left',
      (nextProps.progress *
      $element.parent()[0].getBoundingClientRect().width / 100
      ) + 'px');

    $element.parent().css(
      'background',
      'linear-gradient(to right,  #2CA4AB 0%,#2CA4AB ' +
      nextProps.progress +
      '%,#635e49 ' +
      nextProps.progress +
      '%,#635e49 100%');
  }

  render() {
    return (
      <div className="audioplayer-tracker">
      </div>
    );
  }
}

export default AudioplayerTracker;
