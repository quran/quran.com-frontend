import React, { Component, PropTypes } from 'react';

export default class LazyLoad extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool,
    onLazyLoad: PropTypes.func.isRequired,
    loadingComponent: PropTypes.any,
    endComponent: PropTypes.any
  }

  static defaultProps = {
    loadingComponent: 'Loading...',
    endComponent: 'End.'
  }

  render() {
    const { isEnd, loadingComponent, endComponent } = this.props;

    if (isEnd) {
      return endComponent;
    }

    return loadingComponent;
  }
}
