import React from 'react';
import { shallow } from 'enzyme';

import Title from './index';

let wrapper;
const chapter = {
  id: 1,
  name: {
    arabic: 'الفاتحة',
    simple: 'Al-Fatihah',
    complex: 'Al-Fātiĥah',
    english: 'The Opener'
  }
};

const renderComponent = data => shallow(<Title chapter={data} />);

describe('<Title />', () => {
  it('should render', () => {
    wrapper = renderComponent(chapter);
    expect(wrapper).to.be.ok; // eslint-disable-line
  });

  it('should not show previous chapter if on the first chapter', () => {
    wrapper = renderComponent(chapter);
    const previous = wrapper.find('.previous-chapter').length;
    expect(previous).to.equal(0);
  });

  it('should not show next chapter if on the last chapter', () => {
    chapter.chapterNumber = 114;
    wrapper = renderComponent(chapter);
    const next = wrapper.find('.next-chapter').length;
    expect(next).to.equal(0);
  });
});
