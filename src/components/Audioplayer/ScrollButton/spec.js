import React from 'react';
import { mount } from 'enzyme';

import ScrollButton from './index';

let makeComponent, component, onScrollToggle;

describe('<ScrollButton />', () => {
  beforeEach(() => {
    makeComponent = (shouldScroll) => {
      onScrollToggle = sinon.stub();

      component = mount(
        <ScrollButton shouldScroll={shouldScroll} onScrollToggle={onScrollToggle} />
      );
    }
  });

  it('should indicate that shouldScroll', () => {
    makeComponent(true);

    expect(component.find('label').first().props().className).to.contain('scroll');
  });

  it('should not indicate that shouldScroll', () => {
    makeComponent(false);

    expect(component.find('label').first().props().className).not.to.contain('scroll');
  });

  it('should call onScrollToggle when clicked', () => {
    component.find('label').first().simulate('click');

    expect(onScrollToggle).to.have.been.called;
  });
});
