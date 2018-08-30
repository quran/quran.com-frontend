import React from 'react';
import Tafsir from '../Tafsir';
import verse from '../../../tests/fixtures/verse';

const props = {
  verse,
};

describe('<Tafsir />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Tafsir {...props} />)).toBeTruthy();
  });
});
