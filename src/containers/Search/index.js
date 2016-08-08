import React, { Component, PropTypes } from 'react';
import { PropTypes as MetricsPropTypes } from 'react-metrics';

import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import ReactPaginate from 'react-paginate';

// Bootstrap
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Header from './Header';
import Ayah from '../../components/Ayah';
import CoreLoader from '../../components/Loader';

import { search } from '../../redux/actions/search.js';

const style = require('./style.scss');

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
    push: PropTypes.func.isRequired,
    options: PropTypes.object
  };

  static contextTypes = {
    metrics: MetricsPropTypes.metrics
  };

  handlePageChange = (payload) => {
    const { push, query, page } = this.props; // eslint-disable-line no-shadow
    const selectedPage = payload.selected + 1;

    if (page !== selectedPage) {
      this.context.metrics.track(
        'Search',
        {action: 'paginate', label: `${query} - ${selectedPage}`}
      );

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
                  previousLabel={
                    <span aria-hidden="true">
                      <i className="ss-icon ss-directleft" />
                    </span>
                  }
                  nextLabel={
                    <span aria-hidden="true">
                      <i className="ss-icon ss-directright" />
                    </span>
                  }
                  breakLabel={<li className="break"><a href="">...</a></li>}
                  pageNum={pageNum}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  initialSelected={page - 1}
                  forceSelected={page - 1}
                  clickCallback={this.handlePageChange}
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
      return (
        <h3 className="text-center" style={{padding: '15%'}}>
          Sorry, there was an error with your search.
        </h3>
      );
    }

    if (!total) {
      return <h3 className="text-center" style={{padding: '15%'}}>No results found.</h3>;
    }

    if (isLoading) {
      return <div style={{padding: '15%'}}><CoreLoader /></div>;
    }

    return results.map(result => (
      <Ayah ayah={ayahs[result.ayah]} match={result.match} key={result.ayah} isSearched />
    ));
  }

  render() {
    const { query, options } = this.props;

    return (
      <div className="index-page">
        <Helmet
          title={query}
          style={[{
            cssText: `.text-arabic{font-size: ${options.fontSize.arabic}rem;}
            .text-translation{font-size: ${options.fontSize.translation}rem;}`
          }]}
        />
        <Header />
        {this.renderStatsBar()}
        <div className="container surah-list">
          <Row>
            <Col md={12}>
              {this.renderBody()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const AsyncSearch = asyncConnect([{
  promise({ store: { dispatch }, location: { query } }) {
    return dispatch(search(query));
  }
}])(Search);

function mapStateToProps(state) {
  return {
    isErrored: state.searchResults.errored,
    isLoading: state.searchResults.loading,
    total: state.searchResults.total,
    page: state.searchResults.page,
    size: state.searchResults.size,
    from: state.searchResults.from,
    took: state.searchResults.took,
    query: state.searchResults.query,
    results: state.searchResults.results,
    ayahs: state.searchResults.entities,
    options: state.options
  };
}

export default connect(mapStateToProps, {push})(AsyncSearch);
