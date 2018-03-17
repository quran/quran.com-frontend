import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SurahsDropdown from './index';
import { chapters, chapter } from '../../../tests/fixtures/chapters';

storiesOf('SurahsDropdown', module).add('default', () => (
  <MemoryRouter>
    <SurahsDropdown chapters={chapters} chapter={chapter} />
  </MemoryRouter>
));
