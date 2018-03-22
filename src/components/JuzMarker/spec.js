import React from 'react';
import { shallow } from 'enzyme';

import ShowAyahAndJuzMark from './index';

const text = ['Some text', 'some more text'];
const chapterId = 1;
const verseNumber = 1;
const juzNumber = 1;

let wrapper;

describe('<ShowAyahAndJuzMark />', () => {
  beforeEach(() => {
    wrapper = shallow(
      <ShowAyahAndJuzMark
        text={text}
        chapterId={chapterId}
        juzNumber={juzNumber}
        verseNumber={verseNumber}
      />
    );
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
