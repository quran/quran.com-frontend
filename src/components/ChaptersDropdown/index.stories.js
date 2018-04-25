import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ChaptersDropdown from './index';
import { chapters, chapter } from '../../../tests/fixtures/chapters';

storiesOf('ChaptersDropdown', module).add('default', () => (
  <MemoryRouter>
    <ChaptersDropdown chapters={chapters} chapter={chapter} />
  </MemoryRouter>
));
