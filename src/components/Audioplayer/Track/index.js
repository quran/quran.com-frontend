import React, { Component, PropTypes } from 'react';

const style = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    onTrackChange: PropTypes.func.isRequired
  };

  handleClick = (event) => {
    console.log(this.refs.container.getBoundingClientRect());
    const { onTrackChange } = this.props;

    const fraction = (
      event.nativeEvent.offsetX /
      this.refs.container.getBoundingClientRect().width
    );

    return onTrackChange(fraction);
  }

  render() {
    const { progress } = this.props;

    return (
      <div ref="container" className={style.track} onClick={this.handleClick}>
        <div className={style.progress} style={{width: `${progress}%`}} />
      </div>
    );
  }
}
