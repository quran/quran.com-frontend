import React, { PropTypes } from 'react';
import Provider from 'react-redux/lib/components/Provider';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import App from '../App';

import getLocalMessages from 'helpers/setLocal';

const Root = ({ store }) => (
  <ThemeProvider theme={theme}>
    <IntlProvider locale="en" messages={getLocalMessages()}>
      <Provider store={store} key="provider">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  </ThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object // eslint-disable-line
};

export default Root;
