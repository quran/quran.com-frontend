/* global window */
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

export default function createStore(data: $TsFixMe) {
  const middleware = [thunk, reduxPackMiddleware];

  if (__CLIENT__) {
    middleware.push(logger);
  }

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    finalCreateStore = compose(applyMiddleware(...middleware))(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__ && (module as $TsFixMe).hot) {
    (module as $TsFixMe).hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
}
