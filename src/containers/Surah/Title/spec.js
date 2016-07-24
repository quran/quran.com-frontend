import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Title from './index';
import getSurahs from '../../../../tests/fixtures/getSurahs.js';

let wrapper;
let surah = {
  "id": 1,
  "name": {
    "arabic": "الفاتحة",
    "simple": "Al-Fatihah",
    "complex": "Al-Fātiĥah",
    "english": "The Opener"
  }
};


describe('<Title />', () => {

  it('should render', () => {
    wrapper = renderComponent(surah);
    expect(wrapper).to.be.ok;
  });

  it('should not show previous surah if on the first surah', () => {
    wrapper = renderComponent(surah);

    const previous = wrapper.find('.previous-chapter').length;
    const next = wrapper.find('.next-chapter').length;

    expect(previous).to.equal(0);
    expect(next).to.equal(1);
  });

  it('should not show next surah if on the last surah', () => {
    surah.id = 114;
    wrapper = renderComponent(surah);

    const previous = wrapper.find('.previous-chapter').length;
    const next = wrapper.find('.next-chapter').length;

    expect(previous).to.equal(1);
    expect(next).to.equal(0);
  });

  it('should show both next and previous if surah is neither last or first', () => {
    surah.id = 14;
    wrapper = renderComponent(surah);

    const previous = wrapper.find('.previous-chapter').length;
    const next = wrapper.find('.next-chapter').length;

    expect(previous).to.equal(1);
    expect(next).to.equal(1);
  });
});

function renderComponent(data) {
  return shallow(<Title surah={data}/>);
}
