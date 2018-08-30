import cookie from 'react-cookie';
import config from '../../config';

export default (req?: $TsFixMe) => {
  const locales = config('locales');
  const availableLocals = Object.keys(locales);
  const expireDate = new Date();
  let currentLocal;

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

  const localeData = config('localeMessages')[currentLocal];

  return localeData.messages;
};
