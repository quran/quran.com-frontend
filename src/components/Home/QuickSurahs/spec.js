import React from 'react';
import { mount } from 'enzyme';
import Link from 'react-router/lib/Link';
import QuickSurahs from './index.js';

describe("<QuickSurahs />", () => {

  it("Should render QuickSurahs component", () => {
    let component = mount(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('a').length).to.equal(4);
  });

  it("Should render QuickSurahs component with Surah Al-Kahf", () => {
    sinon.useFakeTimers(1470956400000);
    let component = mount(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('a').length).to.equal(5);
  })

});
