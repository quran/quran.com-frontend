import React from 'react';
import { mount } from 'enzyme';
import Link from 'react-router/lib/Link';
import QuickSurahs from './index.js';

describe("<QuickSurahs />", () => {
  let clock;

  it("Should render QuickSurahs component", () => {
    // Sat, nov 13 2016
    clock = sinon.useFakeTimers(1478975400000);
    console.log("First Test date is -", new Date());
    let component = mount(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('Link').length).to.equal(4);
  });

  it("Should render QuickSurahs component with Surah Al-Kahf", () => {
    // Fri, nov 11 2016
    clock = sinon.useFakeTimers(1478802600000);
    console.log("Second Test date is -", new Date());
    let component = mount(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('a').length).to.equal(5);
  })

});
