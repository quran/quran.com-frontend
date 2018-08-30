import React from 'react';
import JuzDecoration from '../JuzDecoration';

describe('<JuzDecoration />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<JuzDecoration juzNumber={1} />)).toBeTruthy();
  });
});
