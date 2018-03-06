import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ChaptersList from './index';
import { chapters } from '../../../../tests/fixtures/chapters';

storiesOf('Home/ChaptersList', module).add('default', () => (
  <MemoryRouter>
    <ChaptersList chapters={chapters} />
  </MemoryRouter>
));
