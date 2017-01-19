import React from 'react';
import { mount } from 'enzyme';
import getSurahs from '../../../../tests/fixtures/getSurahs.js';

import SurahsList from './index.js';

describe('<SurahsList />', () => {
  it('Should render SurahList component', () => {
    const component = mount(<SurahsList surahs={getSurahs.default.slice(0, 4)} />);
    expect(component).to.be.ok; // eslint-disable-line
    expect(component.find('li').length).to.equal(4);
  });
});
