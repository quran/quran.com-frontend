import React from 'react';
import { shallow } from 'enzyme';

import Title from './index';

let wrapper;
const surah = {
  id: 1,
  name: {
    arabic: 'الفاتحة',
    simple: 'Al-Fatihah',
    complex: 'Al-Fātiĥah',
    english: 'The Opener'
  }
};

const renderComponent = data => shallow(<Title surah={data} />);

describe('<Title />', () => {
  it('should render', () => {
    wrapper = renderComponent(surah);
    expect(wrapper).to.be.ok; // eslint-disable-line
  });

  it('should not show previous surah if on the first surah', () => {
    wrapper = renderComponent(surah);
    const previous = wrapper.find('.previous-chapter').length;
    expect(previous).to.equal(0);
  });

  it('should not show next surah if on the last surah', () => {
    chapter.chapterNumber = 114;
    wrapper = renderComponent(surah);
    const next = wrapper.find('.next-chapter').length;
    expect(next).to.equal(0);
  });
});
