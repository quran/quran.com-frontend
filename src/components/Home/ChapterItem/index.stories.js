import React from 'react';

import { storiesOf } from '@storybook/react';

import ChapterItem from './index';
import { chapter } from '../../../../tests/fixtures/chapters';

storiesOf('Home/ChapterItem', module).add('default', () => (
  <ChapterItem chapter={chapter} />
));
