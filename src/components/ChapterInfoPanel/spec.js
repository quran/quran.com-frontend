import React from 'react';
import { shallow } from 'enzyme';

import { chapter } from '../../../tests/fixtures/chapters';
import { chapterInfo } from '../../../tests/fixtures/chapterInfos';
import ChapterInfoPanel from './index';

let wrapper;
let props;

describe('<ChapterInfoPanel />', () => {
  beforeEach(() => {
    props = {
      setOption: jest.fn(),
      isShowingSurahInfo: true,
      chapter,
      chapterInfo
    };

    wrapper = shallow(<ChapterInfoPanel {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });
});
