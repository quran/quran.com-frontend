import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import debug from '../../helpers/debug';

export default class LazyLoad extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool,
    onLazyLoad: PropTypes.func.isRequired,
    loadingComponent: PropTypes.any,
    endComponent: PropTypes.any,
    offset: PropTypes.number
  }

  static defaultProps = {
    loadingComponent: 'Loading...',
    endComponent: 'End.',
    offset: 1000
  }

  componentDidMount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.onScroll, true);
      window.addEventListener('scroll', this.onScroll, true);
    }
  }

  onScroll = () => {
    const { isLoading, isEnd, offset } = this.props;
    const dom = ReactDOM.findDOMNode(this);

    if ((!isLoading && !isEnd) && (dom.offsetParent || dom).offsetTop - (window.pageYOffset + window.innerHeight) <  offset) {
      debug('component:LazyLoad', 'onLazyLoad called');
      return this.props.onLazyLoad();
    }

    return false;
  }

  render() {
    const { isEnd, loadingComponent, endComponent } = this.props;

    if (isEnd) {
      return endComponent;
    }

    return loadingComponent;
  }
}
