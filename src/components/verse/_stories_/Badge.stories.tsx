import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import Badge from '../Badge';
import verse from '../../../../tests/fixtures/verse';

storiesOf('verse/Badge', module).add('default', () => (
  <MemoryRouter>
    <Badge verse={verse} />
  </MemoryRouter>
));
