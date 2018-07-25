import cookie from 'react-cookie';
import config from '../../config';

export default (req?: $TsFixMe) => {
  let currentLocal;
  const availableLocals = Object.keys(config('locales'));
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

  const localeData = require('../locale/' + currentLocal + '.js'); // eslint-disable-line

  return localeData.default.messages;
};
