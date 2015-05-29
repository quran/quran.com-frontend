'use strict';

import React from 'react';
import SearchHeader from 'components/header/SearchHeader';
import {connectToStores, provideContext} from 'fluxible/addons';
import AyahsStore from 'stores/AyahsStore';
import AyahsList from 'components/surah/AyahsList';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-page">
        <SearchHeader />
        {this.props.stats}
        <div className="container surah-list">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <AyahsList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search = connectToStores(Search, [AyahsStore], (stores, props) => {
  return {
    stats: stores.AyahsStore.getSearchStats()
  }
});

export default Search;
