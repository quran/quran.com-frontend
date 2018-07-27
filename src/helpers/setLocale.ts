import cookie from 'react-cookie';
import config from '../../config';

export default (req?: $TsFixMe) => {
  let currentLocal;
  const locales = config('locales');
  const availableLocals = Object.keys(locales);
  const expireDate = new Date();
  expireDate.setFullYear(expireDate.getFullYear() + 1);

  if (req && req.query.local) {
    currentLocal = req.query.local;
  } else {
    currentLocal = cookie.load('currentLocale');
  }

  if (availableLocals.indexOf(currentLocal) === -1) {
    currentLocal = config('defaultLocale');
  }

  cookie.save('currentLocale', currentLocal, {
    path: '/',
    expires: new Date(expireDate),
  });
  // TODO: ideally, the server sends the locales via ClientConfig component
  // and the client picks up the configs and uses them accordingly
  const localeData = require('../locale/' + currentLocal + '.ts'); // eslint-disable-line

  return localeData.default.messages;
};
