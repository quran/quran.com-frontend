import React from 'react';
import { mount } from 'enzyme';

import ScrollButton from './index';

let makeComponent;
let component;
let onScrollToggle;

describe('<ScrollButton />', () => {
  beforeEach(() => {
    makeComponent = (shouldScroll) => {
      onScrollToggle = sinon.stub();

      component = mount(
        <ScrollButton
          shouldScroll={shouldScroll}
          onScrollToggle={onScrollToggle}
        />
      );
    };
  });

  it('should indicate that shouldScroll', () => {
    makeComponent(true);

    expect(component.find('a').first().props().className).to.contain('scroll');
  });

  it('should not indicate that shouldScroll', () => {
    makeComponent(false);

    expect(component.find('a').first().props().className).not.to.contain(
      'scroll'
    );
  });

  it('should call onScrollToggle when clicked', () => {
    component.find('a').first().simulate('click');

    expect(onScrollToggle).to.have.been.called; // eslint-disable-line
  });
});
