import React from 'react';
import { shallow } from 'enzyme';
import Controls from '../Controls';
import { getVerse } from '../../../../tests/fixtures/verse';
import { chapter } from '../../../../tests/fixtures/chapters';

const verse = getVerse(1, 1);
let props;

describe('<Controls />', () => {
  beforeEach(() => {
    props = {
      verse,
      chapter,
      isCurrentVersePlaying: false,
      onPlayClick: jest.fn(),
      onTafsirsClick: jest.fn(),
    };
  });

  it('renders correctly', () => {
    expect(React.isValidElement(<Controls {...props} />)).toBeTruthy();
  });
});
