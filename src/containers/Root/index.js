import React from 'react';
import PropTypes from 'prop-types';
import Provider from 'react-redux/lib/components/Provider';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import getLocalMessages from 'helpers/setLocal';
import App from '../App';
import theme from '../../theme';

const Root = ({ store }) =>
  <IntlProvider locale="en" messages={getLocalMessages()}>
    <Provider store={store} key="provider">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </IntlProvider>;

Root.propTypes = {
  store: PropTypes.object // eslint-disable-line
};

export default Root;
