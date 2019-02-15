import React from 'react';
import TranslationNode from '../TranslationNode';

describe('<TranslationNode />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<TranslationNode />)).toBeTruthy();
  });
});
