/* global window */
import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import debug from 'helpers/debug';

export default class LazyLoad extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
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

  componentWillUnmount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.onScroll, true);
    }
  }

  onScroll = () => {
    const { isLoading, isEnd, offset, onLazyLoad } = this.props;
    const dom = ReactDOM.findDOMNode(this);
    const componentOffset = (dom.offsetParent || dom).offsetTop - (window.pageYOffset + window.innerHeight); // eslint-disable-line max-len

    if ((!isLoading && !isEnd) && componentOffset < offset) {
      debug('component:LazyLoad', 'onLazyLoad called');
      return onLazyLoad();
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
