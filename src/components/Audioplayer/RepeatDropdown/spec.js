import React from 'react';
import { mount } from 'enzyme';

import RepeatDropdown from './index';

let makeComponent, component, setRepeat;
const surah = {
  ayat: 10
};

describe('<RepeatDropdown />', () => {
  beforeEach(() => {
    makeComponent = (repeat) => {
      setRepeat = sinon.stub();

      component = mount(
        <RepeatDropdown
          repeat={repeat}
          setRepeat={setRepeat}
          current={1}
          surah={surah}
        />
      );
    }
  });

  it('should indicate repeating', () => {
    makeComponent({from: 1, to: 10});

    expect(component.find('label').first().props().className).to.contain('repeat');
  });

  it('should not indicate that shouldRepeat', () => {
    makeComponent({});

    expect(component.find('label').first().props().className).not.to.contain('repeat');
  });

  it('should call onRepeatToggle when clicked', () => {
    component.find('label').first().simulate('click');

    expect(onRepeatToggle).to.have.been.called;
  });
});
