import React from 'react';
import { shallow } from 'enzyme';

import { Decoration } from './index';

const juzNumber = 1;

let wrapper;

describe('<Decoration />', () => {
  beforeEach(() => {
    wrapper = shallow(<Decoration juzNumber={juzNumber} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
