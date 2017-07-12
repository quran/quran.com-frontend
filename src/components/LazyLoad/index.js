/* global window */
import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import debug from 'helpers/debug';

class LazyLoad extends Component {
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
    // TODO: Remove ReactDOM!
    const dom = ReactDOM.findDOMNode(this); // eslint-disable-line
    const componentOffset =
      (dom.offsetParent || dom).offsetTop -
      (window.pageYOffset + window.innerHeight); // eslint-disable-line max-len

    if (!isLoading && !isEnd && componentOffset < offset) {
      debug('component:LazyLoad', 'onLazyLoad called');
      return onLazyLoad();
    }

    return false;
  };

  render() {
    const { isEnd, loading, endComponent } = this.props;

    if (isEnd) {
      return endComponent;
    }

    return loading;
  }
}

LazyLoad.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isEnd: PropTypes.bool.isRequired,
  onLazyLoad: PropTypes.func.isRequired,
  loading: PropTypes.element,
  endComponent: PropTypes.element,
  offset: PropTypes.number
};

LazyLoad.defaultProps = {
  loading: 'Loading...',
  endComponent: 'End.',
  offset: 1000
};

export default LazyLoad;
