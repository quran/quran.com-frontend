import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ChapterItem from './index';
import { chapter } from '../../../../tests/fixtures/chapters';

storiesOf('Home/ChapterItem', module).add('default', () => (
  <MemoryRouter>
    <ChapterItem chapter={chapter} />
  </MemoryRouter>
));
