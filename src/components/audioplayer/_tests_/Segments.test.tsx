import React from 'react';
import Segments from '../Segments';
import { segment } from '../../../../tests/fixtures/segments';

const props = {
  segments: segment,
  currentVerseKey: '1:1',
  currentTime: 0,
};

describe('<Segments />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Segments {...props} />)).toBeTruthy();
  });
});
