import React from 'react';
import T, { KEYS } from '../T';

describe('<T />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<T id={KEYS.ACTIONS_COPIED} />)).toBeTruthy();
  });
});
