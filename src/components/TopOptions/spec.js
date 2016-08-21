import React from 'react';
import { shallow } from 'enzyme';

import TopOptions from './index.js';
import getSurahs from '../../../tests/fixtures/getSurahs.js';
//used components
import InformationToggle from 'components/InformationToggle';
import FontSizeDropdown from 'components/FontSizeDropdown';
import TooltipDropdown from 'components/TooltipDropdown';
import ReadingModeToggle from 'components/ReadingModeToggle';
import Share from 'components/Share';

describe("<TopOptions />", () => {

  it("Should render QuickSurahs component", () => {
    let component = shallow(<TopOptions
                                        options={{
                                          isReadingMode: false,
                                          isShowingSurahInfo: false,
                                          tooltip:"translation",
                                          fontSize: {}}}
                                        actions={{
                                        options: {
                                          setOption: () => {},
                                          toggleReadingMode: () => {}}}}
                                        surah={getSurahs[5]}/>);

    expect(component).to.be.ok;

    expect(component.find(Share).length).to.eql(1);
    expect(component.find(InformationToggle).length).to.eql(1);
    expect(component.find(FontSizeDropdown).length).to.eql(1);
    expect(component.find(TooltipDropdown).length).to.eql(1);
    expect(component.find(ReadingModeToggle).length).to.eql(1);
  });

});
