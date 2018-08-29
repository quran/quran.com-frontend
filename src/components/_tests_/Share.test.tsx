import React from 'react';
import Share from '../Share';
import verse from '../../../tests/fixtures/verse';
import { chapter } from '../../../tests/fixtures/chapters';

const props = {
  chapter,
  verse,
};

describe('<Share />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Share {...props} />)).toBeTruthy();
  });
});
