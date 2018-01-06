import React from 'react';

import { storiesOf } from '@storybook/react';

import ChaptersList from './index';
import { chapters } from '../../../../tests/fixtures/chapters';

storiesOf('Home/ChaptersList', module).add('default', () =>
  <ChaptersList chapters={chapters} />
);
