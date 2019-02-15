import React from 'react';
import Translation from '../Translation';
import verse from '../../../tests/fixtures/verse';

const props = {
  translation: verse.translations[0],
  fetchFootNote: jest.fn(),
};

describe('<Translation />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Translation {...props} />)).toBeTruthy();
  });
});
