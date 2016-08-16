import React from 'react';
import { shallow } from 'enzyme';

import QuickSurahs from './index.js';

describe("<QuickSurahs />", () => {

  it("Should render QuickSurahs component", () => {
    let component = shallow(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('.list-inline li').length).to.equal(5);
  });

  it("Should render QuickSurahs component with Surah Al-Kahf", () => {
    sinon.useFakeTimers(1470956400000);
    let component = shallow(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('.list-inline li').length).to.equal(6);
  })

});
