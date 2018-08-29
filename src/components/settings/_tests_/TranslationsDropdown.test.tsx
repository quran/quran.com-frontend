import React from 'react';
import TranslationsDropdown from '../TranslationsDropdown';

const props = {
  setSetting: jest.fn(),
  translationOptions: [],
  translationSettings: [1],
  fetchTranslations: jest.fn(),
};

describe('<TranslationsDropdown />', () => {
  it('renders valid', () => {
    expect(
      React.isValidElement(<TranslationsDropdown {...props} />)
    ).toBeTruthy();
  });
});
