import React from 'react';
import FootNote from '../FootNote';

const footNote = {
  id: 1,
  text: 'text',
  languageName: 'english',
};

describe('<FootNote />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<FootNote footNote={footNote} />)).toBeTruthy();
  });
});
