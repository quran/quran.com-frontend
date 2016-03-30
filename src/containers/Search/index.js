import React, { Component, PropTypes } from 'react';
import { PropTypes as MetricsPropTypes } from "react-metrics";
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import ReactPaginate from 'react-paginate';

// Bootstrap
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import SearchHeader from 'components/header/SearchHeader';
// import SearchInput from 'components/SearchInput';
import Ayah from '../../scripts/components/surah/Ayah';
import CoreLoader from '../../scripts/components/Loader';

import { search } from '../../redux/modules/searchResults';

const style = require('./style.scss');

@asyncConnect([{
  promise({ store: { dispatch }, location: { query } }) {
    return dispatch(search(query));
  }
}])
@connect(
  state => ({
    isErrored: state.searchResults.errored,
    isLoading: state.searchResults.loading,
    total: state.searchResults.total,
    page: state.searchResults.page,
    size: state.searchResults.size,
    from: state.searchResults.from,
    took: state.searchResults.took,
    query: state.searchResults.query,
    results: state.searchResults.results,
    ayahs: state.searchResults.entities
  }),
  { push }
)
class Search extends Component {
  static propTypes = {
    isErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    total: PropTypes.number,
    page: PropTypes.number,
    size: PropTypes.number,
    from: PropTypes.number,
    took: PropTypes.object,
    query: PropTypes.string,
    results: PropTypes.array,
    ayahs: PropTypes.object,
    push: PropTypes.func.isRequired
  };

  static contextTypes = {
    metrics: MetricsPropTypes.metrics
  };

  handlePageChange(payload) {
    const { push, query, page } = this.props; // eslint-disable-line no-shadow
    const selectedPage = payload.selected + 1;

    if (page !== selectedPage) {
      this.context.metrics.track('Search', {action: 'paginate', label: `${query} - ${selectedPage}`});

      return push({
        pathname: '/search',
        query: {p: selectedPage, q: query}
      });
    }

    return true;
  }

  renderStatsBar() {
   const { total, size, page, from, query } = this.props;

   if (total) {
     const pageNum = Math.ceil(total / size);

     return (
       <div className={style.header}>
         <Grid>
           <Row>
             <Col md={6} className="text-uppercase">
               {from}-{from + size - 1} OF
               <span className={style.colored}> {total} </span>
               SEARCH RESULTS FOR:
               <span className={style.colored}> {query}</span>
             </Col>
             <Col className="text-right">
               <ReactPaginate
                 previousLabel={<span aria-hidden="true"><i className="ss-icon ss-directleft"/></span>}
                 nextLabel={<span aria-hidden="true"><i className="ss-icon ss-directright"/></span>}
                 breakLabel={<li className="break"><a href="">...</a></li>}
                 pageNum={pageNum}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 initialSelected={page - 1}
                 forceSelected={page - 1}
                 clickCallback={this.handlePageChange.bind(this)}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClass={style.active}
               />
             </Col>
           </Row>
         </Grid>
       </div>
     );
   }

   return false;
 }



 renderBody() {
   const { isErrored, isLoading, total, results, ayahs } = this.props;

   if (isErrored) {
     return <h3 className="text-center" style={{padding: '15%'}}>Sorry, there was an error with your search.</h3>;
   }

   if (!total) {
     return <h3 className="text-center" style={{padding: '15%'}}>No results found.</h3>;
   }

   if (isLoading) {
     return <div style={{padding: '15%'}}><CoreLoader /></div>;
   }

   return results.map(key => <Ayah ayah={ayahs[key]} key={key} isSearched />);
 }

  render() {
    const { query } = this.props;

    return (
      <div className="index-page">
        <Helmet title={query} />
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

export default Search;
