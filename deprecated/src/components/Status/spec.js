import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router';

import Status from './index';

describe('<Status />', () => {
  test('should render valid', () => {
    expect(
      React.isValidElement(
        <Status code={404}>
          <div />
        </Status>
      )
    ).toBeTruthy();
  });

  test('should render Route', () => {
    const wrapper = shallow(
      <Status code={404}>
        <div />
      </Status>
    );

    expect(wrapper.find(Route)).toHaveLength(1);
  });
});
