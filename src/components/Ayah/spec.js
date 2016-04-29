import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Ayah from './index';

import ayah from '../../../tests/fixtures/ayah';
let wrapper;

describe('<Ayah />', () => {
  beforeEach(() => {
    wrapper = shallow(<Ayah ayah={ayah} />);
  });

  it('should render', () => {
    expect(wrapper).to.be.ok;
  });

  it('should have correct ayah number', () => {
    expect(wrapper.find('.label').text()).to.eql(ayah.ayahKey)
  });

  it('should contain translations', () => {
    expect(wrapper.find('.translation').text()).to.eql(ayah.content[0].resource.name);
  });
});
