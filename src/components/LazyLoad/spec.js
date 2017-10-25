import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import LazyLoad from './index';

// eslint-disable-next-line no-underscore-dangle
global.__CLIENT__ = true;

let wrapper;
let onLazyLoad;
let makeComponent;

describe('<LazyLoad />', () => {
  beforeEach(() => {
    makeComponent = (isEnd = false, isLoading = false) => {
      onLazyLoad = sinon.stub();
      wrapper = mount(
        <LazyLoad
          onLazyLoad={onLazyLoad}
          isEnd={isEnd}
          isLoading={isLoading}
          endComponent={<p>End</p>}
          loadingComponent={<p>Loading</p>}
        />
      );
    };

    makeComponent();
  });

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should show loading component', () => {
    expect(wrapper.text()).toEqual('Loading');
  });

  it('should show end component when no more lazy loading needed', () => {
    makeComponent(true);
    expect(wrapper.text()).toEqual('End');
  });

  it('should call onLazyLoad when not end and not loading', () => {
    wrapper.instance().onScroll();
    expect(wrapper.props().onLazyLoad.callCount).toEqual(1);
  });

  it('should not call onLazyLoad when at end', () => {
    makeComponent(true);
    wrapper.instance().onScroll();
    expect(wrapper.props().onLazyLoad.callCount).toEqual(0);
  });

  it('should not call onLazyLoad when loading', () => {
    makeComponent(false, true);
    wrapper.instance().onScroll();
    expect(wrapper.props().onLazyLoad.callCount).toEqual(0);
  });
});
