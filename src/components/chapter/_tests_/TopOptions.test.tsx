import React from 'react';
import TopOptions from '../TopOptions';
import { chapter } from '../../../../tests/fixtures/chapters';

const props = {
  title: 'Title',
  chapter,
};

describe('<TopOptions />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<TopOptions {...props} />)).toBeTruthy();
  });
});
