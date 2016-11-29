import React from 'react';
import { mount } from 'enzyme';
import Link from 'react-router/lib/Link';
import QuickSurahs from './index.js';

describe("<QuickSurahs />", () => {
  let clock;

  it("Should render QuickSurahs component", () => {
    clock = sinon.useFakeTimers(1478975400000);
    let component = mount(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('Link').length).to.equal(4);
  });

  it("Should render QuickSurahs component with Surah Al-Kahf", () => {
    clock = sinon.useFakeTimers(1478802600000);
    let component = mount(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('a').length).to.equal(5);
  })

});
