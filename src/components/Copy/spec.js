import React from 'react';
import { shallow } from 'enzyme';

import Copy from './index';

const text = 'Some text';
let wrapper;

describe('<Copy />', () => {
  beforeEach(() => {
    wrapper = shallow(<Copy text={text} verseKey="1:1" />);
  });

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });
});
