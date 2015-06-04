import React from 'react';
import SearchHeader from 'components/header/SearchHeader';
import {connectToStores} from 'fluxible/addons';
import AyahsStore from 'stores/AyahsStore';
import AyahsList from 'components/surah/AyahsList';
import Pagination from 'components/Pagination';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-page">
        <SearchHeader />
        <div className="search-pagination-header">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-uppercase">
                {this.props.stats.page}-{this.props.stats.hits} OF
                <span className="colored"> {this.props.stats.total} </span>
                SEARCH RESULTS FOR:
                <span className="colored"> {this.props.stats.query}</span>
              </div>
              <div className="col-md-6 text-right">
                <Pagination hitsPerPage={this.props.stats.hits} totalHits={this.props.stats.total} />
              </div>
            </div>
          </div>
        </div>
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
