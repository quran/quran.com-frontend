import React from 'react';
import { mount } from 'enzyme';
import Link from 'react-router/lib/Link';
import QuickSurahs from './index.js';
import { mountWithIntl } from '../../../../tests/helpers/intl-enzyme-test-helper.js';


describe("<QuickSurahs />", () => {
  const count = new Date().getDay() === 5 ? 5 : 4;

  it("Should render QuickSurahs component", () => {
    let component = mountWithIntl(<QuickSurahs />);

    expect(component).to.be.ok;
    expect(component.find('a').length).to.equal(count);
  });

  it("Should render QuickSurahs component with Surah Al-Kahf", () => {
    let component = mountWithIntl(<QuickSurahs />);
    expect(component).to.be.ok;
    expect(component.find('a').length).to.equal(count);
  })

});
