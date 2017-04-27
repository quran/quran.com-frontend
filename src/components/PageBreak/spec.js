import React from 'react';
import { shallow } from 'enzyme';

import PageBreak from './index';

let wrapper;
const pageNum = 15;

describe('<PageBreak />', () => {
  beforeEach(() => {
    wrapper = shallow(<PageBreak pageNum={pageNum} />);
  });

  it('should render', () => {
    expect(wrapper).to.be.ok; // eslint-disable-line
  });

  it('should show page number', () => {
    expect(wrapper.html()).to.contain(`Page ${pageNum}`);
  });
});
