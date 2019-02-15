import React from 'react';
import RepeatDropdown from '../RepeatDropdown';
import { chapter } from '../../../../tests/fixtures/chapters';

const props = {
  chapter,
  repeat: {},
  setRepeat: jest.fn(),
  current: 1,
};

describe('<RepeatDropdown />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<RepeatDropdown {...props} />)).toBeTruthy();
  });
});
