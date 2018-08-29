import React from 'react';
import VersesDropdown from '../VersesDropdown';
import verse from '../../../tests/fixtures/verse';

const props = {
  onClick: jest.fn(),
  isReadingMode: false,
  verses: { '1:1': verse },
};

describe('<VersesDropdown />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<VersesDropdown {...props} />)).toBeTruthy();
  });
});
