import React from 'react';
import Error from '../Error';
import LOCALE_KEYS from '../../locale/keys';

const props = {
  match: {
    params: {
      errorKey: LOCALE_KEYS.ERROR_INVALID_CHAPTER as 'ERROR_INVALID_CHAPTER',
    },
  },
};

describe('<Error />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Error {...props} />)).toBeTruthy();
  });
});
