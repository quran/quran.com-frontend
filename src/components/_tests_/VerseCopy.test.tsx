import React from 'react';
import VerseCopy from '../VerseCopy';

describe('<VerseCopy />', () => {
  it('renders valid', () => {
    expect(
      React.isValidElement(<VerseCopy text="Text" verseKey="1:1" />)
    ).toBeTruthy();
  });
});
