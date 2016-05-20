import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import debug, { error } from '../../helpers/debug';

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
    this.error = error('component:LazyLoad');
    this.debug.log('constructor');
  }

  componentWillMount() {
    this.debug('componentWillMount', 'lazyLoadCalls', this.state.lazyLoadCalls, '__CLIENT__', __CLIENT__);
    //this.setState({ lazyLoadCalls: 0 });
  }

  componentDidMount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.onScroll, true);
      window.addEventListener('scroll', this.onScroll, true);
      window.__debug = this;
      //this._lazyLoadCalls = 0;
    }
    this.debug.log('componentDidMount debug.log');
    //if (this.state.lazyLoadCalls == 0) this.onLazyLoad(); // call it manually to ensure we call onLazyLoad at least once
  }

  onScroll = () => {
    this.debug('onScroll debug()');
    this.debug.log('onScroll debug.log()');
    const { isLoading, isEnd, offset } = this.props;
    const dom = ReactDOM.findDOMNode(this);

    // if the dom offset of the loading indicator's offset/position is very large and the inner height + page y offset together are very small or negligible,
    // i.e. we're at the top of the page, this WONT trigger.
    // ...considering that we DO want it to trigger on first run to get that first batch of ayat (we do, right?)
    // then what can make the dom offset of the loading indicator's offset/position very large?
      // 1. it is actually very far away from the current scroll position, i.e. at the bottom of a long scroll, i.e. intended behavior scenario, or
      // 2. a brief period of time in which the page scroll is actually very long even though it is actually empty, i.e. unintended behavior scenario, which would be relevant if this function runs during that brief flash of time...

    // my guess is that maybe this occurs, b/c in my localhost test i noticed that the surah info is momentarily visible even though its just black unstyled text on a transparent/white bg, and this makes the window scroll length very long,
    // so how can we fix this? we could test if this is the first run with a simple counter, that inits at zero on componentDidMount && __CLIENT__, that counts lazy load runs and then always fire if that counter is zero, that seems wisest
    if (this.state.lazyLoadCalls == 0 || (!isLoading && !isEnd) && (dom.offsetParent || dom).offsetTop - (window.pageYOffset + window.innerHeight) <  offset) {
      return this.onLazyLoad();
      //return this.props.onLazyLoad();
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
