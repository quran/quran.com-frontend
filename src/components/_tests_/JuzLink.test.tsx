import React from 'react';
import JuzLink from '../JuzLink';
import { chapter } from '../../../tests/fixtures/chapters';
import { juz } from '../../../tests/fixtures/juzs';

describe('<JuzLink />', () => {
  it('renders valid', () => {
    expect(
      React.isValidElement(<JuzLink juz={juz} chapters={{ 1: chapter }} />)
    ).toBeTruthy();
  });
});
