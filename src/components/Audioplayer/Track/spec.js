import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Track from './index';

let component;
let onTrackChange;

describe.skip('<Track />', () => {
  beforeEach(() => {
    onTrackChange = sinon.stub();
    component = shallow(<Track progress={50} onTrackChange={onTrackChange} />);
  });

  it('should show the progress to be 50%', () => {
    expect(
      component
        .children()
        .first()
        .props().style.width
    ).toEqual('50%');
  });

  it('should return click progress', () => {
    component.simulate('click', { nativeEvent: { offsetX: 1 } });

    expect(onTrackChange.callCount).toEqual(1);
  });
});
