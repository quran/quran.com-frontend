import React from 'react';
import { mount } from 'enzyme';

import RepeatButton from './index';

let makeComponent, component, onRepeatToggle;

describe('<RepeatButton />', () => {
  beforeEach(() => {
    makeComponent = (shouldRepeat) => {
      onRepeatToggle = sinon.stub();

      component = mount(
        <RepeatButton shouldRepeat={shouldRepeat} onRepeatToggle={onRepeatToggle} />
      );
    }
  });

  it('should indicate that shouldRepeat', () => {
    makeComponent(true);

    expect(component.find('label').first().props().className).to.contain('repeat');
  });

  it('should not indicate that shouldRepeat', () => {
    makeComponent(false);

    expect(component.find('label').first().props().className).not.to.contain('repeat');
  });

  it('should call onRepeatToggle when clicked', () => {
    component.find('label').first().simulate('click');

    expect(onRepeatToggle).to.have.been.called;
  });
});
