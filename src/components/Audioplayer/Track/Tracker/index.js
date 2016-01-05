import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const style = require('./style.scss');

export default class Tracker extends Component {
  componentWillReceiveProps(nextProps) {
    const element = ReactDOM.findDOMNode(this);

    element.style.left = (
      nextProps.progress *
      element.parentElement.getBoundingClientRect().width /
      100
    ) + 'px';

    element.parentElement.style.background = (
      'linear-gradient(to right,  #2CA4AB 0%,#2CA4AB ' +
      nextProps.progress +
      '%,#635e49 ' +
      nextProps.progress +
      '%,#635e49 100%'
    );
  }

  render() {
    return (
      <div className={style.tracker} />
    );
  }
}
