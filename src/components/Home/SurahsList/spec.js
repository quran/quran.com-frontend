import React from 'react';
import { shallow } from 'enzyme';
import getSurahs from '../../../../tests/fixtures/getSurahs.js';

import SurahsList from './index.js';

describe("<SurahsList />", () => {

  it("Should render SurahList component", () => {
    let component = shallow(<SurahsList surahs={getSurahs.default.slice(0, 4)}/>);
    expect(component).to.be.ok;
    expect(component.find('.col-md-4 li').length).to.equal(4);
  });

});
