import React from 'react';
import PropTypes from 'prop-types';
import Provider from 'react-redux/lib/components/Provider';
import { IntlProvider } from 'react-intl';

import getLocalMessages from 'helpers/setLocal';

const Root = ({ store, component }) =>
  <IntlProvider locale="en" messages={getLocalMessages()}>
    <Provider store={store} key="provider">
      {component}
    </Provider>
  </IntlProvider>;

Root.propTypes = {
  store: PropTypes.object, // eslint-disable-line
  component: PropTypes.element
};

export default Root;
