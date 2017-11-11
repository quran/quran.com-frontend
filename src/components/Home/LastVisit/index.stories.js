import React from 'react';

import { storiesOf } from '@storybook/react';

import LastVisit from './index';
import { chapter } from '../../../../tests/fixtures/chapters';

storiesOf('Home/LastVisit', module).add('default', () =>
  <LastVisit chapter={chapter} verse={2} />
);
