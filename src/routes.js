/* eslint-disable max-len */
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import checkValidSurah from './utils/checkValidSurah';
import App from './containers/App';

function getComponentByName(name) {
  return (nextState, cb) => System.import(`./containers/${name}`).then(module => cb(null, module)).catch(err => console.trace(err));
}


export default () => (
  <Route path="/" component={App}>
    <IndexRoute getComponent={getComponentByName('Home')} />Donations

    <Route path="/donations" getComponent={getComponentByName('Donations')} />
    <Route path="/contributions" getComponent={getComponentByName('Donations')} />

    <Route path="/about" getComponent={getComponentByName('About')} />

    <Route path="/contact" getComponent={getComponentByName('Contact')} />
    <Route path="/contactus" getComponent={getComponentByName('Contact')} />
    <Route path="/error/:errorKey" getComponent={getComponentByName('Error')} />

    <Route path="/search" getComponent={getComponentByName('Search')} />

    <Route
      path="/:surahId:(:range)"
      getComponent={getComponentByName('Surah')}
      onEnter={checkValidSurah}
    />

    <Route
      path="/:surahId(/:range)"
      getComponent={getComponentByName('Surah')}
      onEnter={checkValidSurah}
    />
  </Route>
);
