import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Home from './containers/Home';
import Surah from './containers/Surah';
import Search from './containers/Search';
import App from './containers/App';
import Donations from './scripts/routes/Donations';
import About from './scripts/routes/About';
import Contact from './scripts/routes/Contact';


export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />

      <Route path="/donations" component={Donations} />
      <Route path="/contributions" component={Donations} />

      <Route path="/about" component={About} />

      <Route path="/contact" component={Contact} />
      <Route path="/contactus" component={Contact} />

      <Route path="/search" component={Search} />

      <Route path="/:surahName/:surahId(/:range)" component={Surah} />
      <Route path="/:surahId(/:range)" component={Surah} />

    </Route>
  );
}
