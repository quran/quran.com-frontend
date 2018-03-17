import React from 'react';

import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from 'components/Footer';

storiesOf('Footer', module).add('default', () => (
  <MemoryRouter>
    <Footer />
  </MemoryRouter>
));
