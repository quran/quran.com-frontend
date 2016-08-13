import React from 'react';
import { shallow } from 'enzyme';
import getSurahs from '../../../tests/fixtures/getSurahs.js';

import SurahList from './SurahList.js';
import QuickSurahs from './QuickSurahs.js';
import Home from './index.js';

describe("<Home />", () => {

  it.only("Should render Home component", () => {
    let component = shallow(<Home surahs={getSurahs.default} lastVisit="something"/>);
    expect(component).to.be.ok;

  });

  it("Should render SurahList component", () => {
    let component = shallow(<SurahList surahs={getSurahs.default.slice(0, 4)}/>);
    expect(component).to.be.ok;
    expect(component.find('.col-md-4 li').length).to.equal(4);
  });

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
