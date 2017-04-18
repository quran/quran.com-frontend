import React from 'react';
import { mount } from 'enzyme';

import Track from './index';

let component;
let onTrackChange;

describe('<Track />', () => {
  beforeEach(() => {
    onTrackChange = sinon.stub();
    component = mount(<Track progress={50} onTrackChange={onTrackChange} />);
  });

  it('should show the progress to be 50%', () => {
    expect(component.children().first().props().style.width).to.eql('50%');
  });

  it('should return click progress', () => {
    component.simulate('click', { nativeEvent: { offsetX: 1 } });

    expect(onTrackChange).to.have.been.called; // eslint-disable-line
    expect(onTrackChange).to.have.been.calledWith(Infinity); // because the bounding box is 0!
  });
});
