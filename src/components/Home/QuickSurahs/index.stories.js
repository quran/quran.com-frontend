import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import QuickSurahs from 'components/Home/QuickSurahs';

storiesOf('Home/QuickSurahs', module).add('default', () => (
  <MemoryRouter>
    <QuickSurahs />
  </MemoryRouter>
));
