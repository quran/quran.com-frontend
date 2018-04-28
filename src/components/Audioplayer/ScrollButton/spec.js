import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
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

  it('should not indicate that shouldScroll', () => {
    makeComponent(false);

    expect(
      component
        .find('a')
        .first()
        .props().className
    ).not.toContain('scroll');
  });

  /*
  it('should call onScrollToggle when clicked', () => {
    component
      .find('a')
      .first()
      .simulate('click');

    expect(onScrollToggle.callCount).toEqual(1);
  });  */
});
