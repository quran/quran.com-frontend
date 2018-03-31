import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LastVisit from './index';
import { chapter } from '../../../../tests/fixtures/chapters';

storiesOf('Home/LastVisit', module).add('default', () => (
  <MemoryRouter>
    <LastVisit chapter={chapter} verse={2} />
  </MemoryRouter>
));
