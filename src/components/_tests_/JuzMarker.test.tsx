import React from 'react';
import JuzMarker from '../JuzMarker';
import verse from '../../../tests/fixtures/verse';

describe('<JuzMarker />', () => {
  it('renders valid', () => {
    expect(
      React.isValidElement(<JuzMarker verse={verse} text="Text" />)
    ).toBeTruthy();
  });
});
