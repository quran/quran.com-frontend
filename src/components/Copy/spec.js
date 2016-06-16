import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Copy from './index';

const text = 'Some text';
let wrapper;

describe('<Copy />', () => {
  beforeEach(() => {
    wrapper = shallow(<Copy text={text} />);
  });

  it('should render', () => {
    expect(wrapper).to.be.ok;
  });
});
