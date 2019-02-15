import React from 'react';
import Text from '../Text';
import { getVerse } from '../../../../tests/fixtures/verse';

const verse = getVerse(1, 1);

describe('<Text />', () => {
  it('renders correctly', () => {
    expect(React.isValidElement(<Text verse={verse} />)).toBeTruthy();
  });
});
