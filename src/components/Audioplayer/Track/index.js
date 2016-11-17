import React, { Component, PropTypes } from 'react';

const styles = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    onTrackChange: PropTypes.func.isRequired
  };

  handleClick = (event) => {
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
      <div ref="container" className={styles.container} onClick={this.handleClick}>
        <div className={styles.progress} style={{width: `${progress}%`}}/>
      </div>
    );
  }
}
