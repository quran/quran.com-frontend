import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Home from './containers/Home';
import Application from './scripts/components/Application';
import Donations from './scripts/routes/Donations';
import About from './scripts/routes/About';
import Contact from './scripts/routes/Contact';
import Search from './scripts/routes/Search';
import Surah from './scripts/routes/Surah';

export default () => {
  return (
    <Route path="/" component={Application}>
      <IndexRoute component={Home} />

      <Route path="/donations" component={Donations} />
      <Route path="/contributions" component={Donations} />

      <Route path="/about" component={About} />

      <Route path="/contact" component={Contact} />
      <Route path="/contactus" component={Contact} />

      <Route path="/search" component={Search} />

      <Route path="/:surahId/:range?" component={Surah} />
    </Route>
  );
}
