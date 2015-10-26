import React from 'react';
import SearchHeader from 'components/header/SearchHeader';
import connectToStores from 'fluxible-addons-react/connectToStores';
import AyahsStore from 'stores/AyahsStore';
import AyahsList from 'components/surah/AyahsList';
import ReactPaginate from 'react-paginate';
import {handleRoute, NavLink, navigateAction} from 'fluxible-router';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handlePageClick(data) {
    this.context.executeAction(navigateAction, {
      url: `/search?q=${this.props.currentRoute.get('query').get('q')}&p=${data.selected + 1}`,
      method: 'GET'
    });
  }

  renderStatsBar() {
    if (this.props.stats.from) {
      let pageNum = Math.ceil(this.props.stats.total / this.props.stats.size),
        currentPage = (parseInt(this.props.currentRoute.get('query').get('p')) - 1) || 0;

      return (
        <div className="search-pagination-header">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-uppercase">
                {this.props.stats.from}-{this.props.stats.from + this.props.stats.size - 1} OF
                <span className="colored"> {this.props.stats.total} </span>
                SEARCH RESULTS FOR:
                <span className="colored"> {this.props.stats.query}</span>
              </div>
              <div className="col-md-6 text-right">
                <ReactPaginate previousLabel={<span aria-hidden="true"><i className="ss-icon ss-directleft"/></span>}
                       nextLabel={<span aria-hidden="true"><i className="ss-icon ss-directright"/></span>}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       initialSelected={currentPage}
                       clickCallback={this.handlePageClick.bind(this)}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClass={"active"} />

              </div>
            </div>
          </div>
        </div>
      );
    }

    return false;
  }

  renderBody() {
    if (this.props.stats.errored) {
      return <h3 className="text-center" style={{padding: '15%'}}>Sorry, there was an error with your search.</h3>;
    }

    return <AyahsList isSearch={true} />;
  }

  render() {
    return (
      <div className="index-page">
        <SearchHeader />
        {this.renderStatsBar()}
        <div className="container surah-list">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {this.renderBody()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.contextTypes = {
  executeAction: React.PropTypes.func.isRequired,
  getStore: React.PropTypes.func.isRequired
};

Search = connectToStores(Search, [AyahsStore], (context, props) => {
  const ayahsStore = context.getStore(AyahsStore);

  return {
    stats: ayahsStore.getSearchStats()
  };
});

Search = handleRoute(Search);

export default Search;
