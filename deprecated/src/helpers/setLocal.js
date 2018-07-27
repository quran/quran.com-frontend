import cookie from 'react-cookie';

import config from '../config';

export default req => {
  let currentLocal;
  const availableLocals = Object.keys(config.locales);
  const expireDate = new Date();
  expireDate.setYear(expireDate.getFullYear() + 1);

  if (req && req.query.local) {
    currentLocal = req.query.local;
  } else {
    currentLocal = cookie.load('currentLocale');
  }

  if (availableLocals.indexOf(currentLocal) === -1) {
    currentLocal = config.defaultLocale;
  }

  cookie.save('currentLocale', currentLocal, {
    path: '/',
    expires: new Date(expireDate),
  });
  // TODO: Optimization: this should come from the backend on the client side
  const localeData = require('../locale/' + currentLocal); // eslint-disable-line

  return localeData.default.messages;
};
