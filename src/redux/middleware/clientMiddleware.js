import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';

import debug from 'helpers/debug';

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, schema, ...rest } = action; // eslint-disable-line no-redeclare
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    debug('clientMiddleware:Request', REQUEST);
    next({...rest, type: REQUEST});
    return promise(client).then(
      (result) => {
        const camelizedJson = camelizeKeys(result);

        debug('clientMiddleware:Result', SUCCESS);
        debug('clientMiddleware:normalizr', normalize(camelizedJson, schema));

        return next({...rest, result: normalize(camelizedJson, schema), type: SUCCESS});
      },
      (error) => next({...rest, error, type: FAILURE})
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error);
      next({...rest, error, type: FAILURE});
    });
  };
}
