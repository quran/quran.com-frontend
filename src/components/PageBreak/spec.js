import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import PageBreak from './index';

let wrapper;
let pageNum = 15;

describe('<ContentDropdown />', () => {
  beforeEach(() => {
    wrapper = shallow(<PageBreak pageNum={pageNum} />);
  });

  it('should render', () => {
    expect(wrapper).to.be.ok;
  });

  it('should show page number', () => {
    expect(wrapper.html()).to.contain(`Page ${pageNum}`);
  });
});
