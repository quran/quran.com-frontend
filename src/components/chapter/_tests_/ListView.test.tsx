import React from 'react';
import ListView from '../ListView';
import { chapter } from '../../../../tests/fixtures/chapters';

const props = {
  chapter,
};

describe('<ListView />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ListView {...props} />)).toBeTruthy();
  });
});
