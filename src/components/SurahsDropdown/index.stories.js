import React from 'react';

import { storiesOf } from '@storybook/react';

import SurahsDropdown from './index';
import { chapters, chapter } from '../../../tests/fixtures/chapters';

storiesOf('SurahsDropdown', module).add('default', () => (
  <SurahsDropdown chapters={chapters} chapter={chapter} />
));
