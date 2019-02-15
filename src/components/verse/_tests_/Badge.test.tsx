import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Badge from '../Badge';
import { getVerse } from '../../../../tests/fixtures/verse';

const verse = getVerse(1, 1);

describe('<Badge />', () => {
  it('renders correctly', () => {
    expect(React.isValidElement(<Badge verse={verse} />)).toBeTruthy();
  });

  it('renders a Link', () => {
    const wrapper = shallow(<Badge verse={verse} />);

    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
