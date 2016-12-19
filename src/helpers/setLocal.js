import config from '../config';
import cookie from 'react-cookie';

export function getLocalMessages(req) {
  let currentLocal;
  let expireDate = new Date();
  expireDate.setYear(expireDate.getFullYear() + 1);
  const availableLocals = Object.keys(config.locales);

  if (req && req.query.local) {
    currentLocal = req.query.local;
  }
  else{
    currentLocal = cookie.load('currentLocale');
  }

  if (availableLocals.indexOf(currentLocal) === -1){
    currentLocal = config.defaultLocale;
  }

  cookie.save('currentLocale', currentLocal, {
    path: '/',
    expires: new Date(expireDate),
  });

  const localeData = require('../locale/' + currentLocal + '.js');

  return localeData.messages;
}
