import React from 'react';

import { storiesOf } from '@storybook/react';

import SurahsList from './index';
import { chapters } from '../../../../tests/fixtures/chapters';

storiesOf('Home/SurahsList', module).add('default', () =>
  <SurahsList chapters={chapters} />
);
