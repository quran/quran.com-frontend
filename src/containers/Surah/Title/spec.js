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
    expect(previous).to.equal(0);
  });

  it('should not show next surah if on the last surah', () => {
    surah.id = 114;
    wrapper = renderComponent(surah);
    const next = wrapper.find('.next-chapter').length;
    expect(next).to.equal(0);
  });

});

function renderComponent(data) {
  return shallow(<Title surah={data}/>);
}
