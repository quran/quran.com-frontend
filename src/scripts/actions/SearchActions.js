// I HAVENT DECIDED IF I WILL KEEP THIS!

import request from 'superagent-promise';
import Settings from 'constants/Settings';
import UserStore from 'stores/UserStore';
import debug from 'utils/Debug';

export function search(actionContext, query, done) {
  return request.get(Settings.url + 'search')
  .query({q: query})
  .end()
  .then((res) => {
    console.log(res);
    done();
  });
}
