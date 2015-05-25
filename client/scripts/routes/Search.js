'use strict';

import React from 'react';
import SearchHeader from 'components/header/SearchHeader';
import {connectToStores, provideContext} from 'fluxible/addons';
import AyahsStore from 'stores/AyahsStore';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-page">
        <SearchHeader />
        <div className="container surah-list">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="row">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Search = connectToStores(Search, [AyahsStore], (stores, props) => {
//   return {
//     ayahs: stores.AyahsStore.getAyahs()
//   }
// });

export default Search;
