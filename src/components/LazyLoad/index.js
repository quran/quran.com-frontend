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

  state = {
    lazyLoadCalls: 0
  };

  constructor(){
    super(...arguments);
    this.debug = debug('component:LazyLoad');
    this.debug('constructor');
  }

  componentWillMount() {
    this.debug('componentWillMount', 'lazyLoadCalls', this.state.lazyLoadCalls, '__CLIENT__', __CLIENT__);
  }

  componentDidMount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.onScroll, true);
      window.addEventListener('scroll', this.onScroll, true);
    }
    this.debug.log('componentDidMount');
  }

  onScroll = () => {
    this.debug.log('onScroll');
    const { isLoading, isEnd, offset } = this.props;
    const dom = ReactDOM.findDOMNode(this);

    if (this.state.lazyLoadCalls == 0 || (!isLoading && !isEnd) && (dom.offsetParent || dom).offsetTop - (window.pageYOffset + window.innerHeight) <  offset) {
      return this.onLazyLoad();
    }

    return false;
  }

  onLazyLoad = () => {
    this.debug.log('onLazyLoad');
    this.setState({ lazyLoadCalls: this.state.lazyLoadCalls + 1 });
    return this.props.onLazyLoad();
  }

  render() {
    this.debug('render');
    const { isEnd, loadingComponent, endComponent } = this.props;

    if (isEnd) {
      return endComponent;
    }

    return loadingComponent;
  }
}
