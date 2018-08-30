import React from 'react';
import ComponentLoader from '../ComponentLoader';

describe('<ComponentLoader />', () => {
  it('renders valid', () => {
    expect(
      React.isValidElement(
        <ComponentLoader isLoading error={null} pastDelay={false} />
      )
    ).toBeTruthy();
  });
});
