import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import QuickChapters from 'components/Home/QuickChapters';

storiesOf('Home/QuickChapters', module).add('default', () => (
  <MemoryRouter>
    <QuickChapters />
  </MemoryRouter>
));
