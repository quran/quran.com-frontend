import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import LazyLoad from './index';

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
    expect(wrapper).to.be.ok;
  });

  it('should show loading component', () => {
    expect(wrapper.text()).to.eql('Loading');
  });

  it('should show end component when no more lazy loading needed', () => {
    makeComponent(true);
    expect(wrapper.text()).to.eql('End');
  });

  it.only('should call onLazyLoad when not end and not loading', () => {
    wrapper.instance().onScroll();
    expect(wrapper.props().onLazyLoad).to.have.been.called;
  });

  it('should not call onLazyLoad when at end', () => {
    makeComponent(true);
    wrapper.instance().onScroll();
    expect(wrapper.props().onLazyLoad).not.to.have.been.called;
  });

  it('should not call onLazyLoad when loading', () => {
    makeComponent(false, true);
    wrapper.instance().onScroll();
    expect(wrapper.props().onLazyLoad).not.to.have.been.called;
  });
});
