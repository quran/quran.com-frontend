import React from 'react';
import { shallow } from 'enzyme';

import TopOptions from './index.js';
import getSurahs from '../../../tests/fixtures/getSurahs.js';
// used components
import InformationToggle from 'components/InformationToggle'; // eslint-disable-line
import FontSizeDropdown from 'components/FontSizeDropdown'; // eslint-disable-line
import TooltipDropdown from 'components/TooltipDropdown'; // eslint-disable-line
import ReadingModeToggle from 'components/ReadingModeToggle'; // eslint-disable-line
import Share from 'components/Share'; // eslint-disable-line

describe('<TopOptions />', () => {
  it('Should render QuickSurahs component', () => {
    const options = {
      isReadingMode: false,
      isShowingSurahInfo: false,
      tooltip: 'translation',
      fontSize: {}
    };

    const actions = {
      options: {
        setOption: () => {},
        toggleReadingMode: () => {}
      }
    };

    const component = shallow(
      <TopOptions
        options={options}
        actions={actions}
        surah={getSurahs[5]}
      />
    );

    expect(component).to.be.ok; // eslint-disable-line
    expect(component.find(Share).length).to.eql(1);
  });
});
