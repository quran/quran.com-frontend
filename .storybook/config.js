import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import getLocalMessages from '../src/helpers/setLocal';
import theme from '../src/theme';

global.__CLIENT__ = true;

addDecorator((story, context) => withInfo('common info')(story)(context));

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <IntlProvider locale="en" messages={getLocalMessages()}>
      {story()}
    </IntlProvider>
  </ThemeProvider>
));

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
