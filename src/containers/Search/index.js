import React, { Component, PropTypes } from 'react';
import { PropTypes as MetricsPropTypes } from 'react-metrics';

import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import ReactPaginate from 'react-paginate';
import { FormattedHTMLMessage } from 'react-intl';

import Ayah from 'components/Ayah';
import Loader from 'components/Loader';

import { search } from 'redux/actions/search.js';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { ayahType, optionsType } from 'types';

import Header from './Header';

const style = require('./style.scss');

class Search extends Component {
  static propTypes = {
    isErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    total: PropTypes.number,
    page: PropTypes.number,
    size: PropTypes.number,
    from: PropTypes.number,
    query: PropTypes.string,
    results: PropTypes.array, // eslint-disable-line
    ayahs: PropTypes.objectOf(ayahType),
    push: PropTypes.func.isRequired,
    options: optionsType
  };

  static defaultProps = {
    results: []
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
        { action: 'paginate', label: `${query} - ${selectedPage}` }
      );

      return push({
        pathname: '/search',
        query: { p: selectedPage, q: query }
      });
    }

    return true;
  }

  renderStatsBar() {
    const { total, size, page, from, query } = this.props;
    const values = { from: 2, to: (from + size) - 1, total: 10, query };


    if (total) {
      const pageNum = Math.ceil(total / size);

      return (
        <div className={style.header}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-uppercase search-status">
                <FormattedHTMLMessage
                  id="search.resultHeading"
                  defaultMessage="{from}-{to} OF {total} SEARCH RESULTS FOR: {query}"
                  values={values}
                />
              </div>
              <div className="col-md-6 text-right">
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
                  breakLabel={<a href="">...</a>}
                  pageNum={pageNum}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  initialSelected={page - 1}
                  forceSelected={page - 1}
                  onPageChange={this.handlePageChange}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  pageLinkClassName="pointer:"
                  activeClass={style.active}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return false;
  }

  renderBody() {
    const { isErrored, isLoading, results, options, ayahs } = this.props;

    if (isErrored) {
      return (
        <h3 className="text-center" style={{ padding: '15%' }}>
          <LocaleFormattedMessage id="search.error" defaultMessage="Sorry, there was an error with your search." />
        </h3>
      );
    }

    if (isLoading) {
      return <div style={{ padding: '15%' }}><Loader /></div>;
    }

    if (!results.length) {
      return (
        <h3 className="text-center" style={{ padding: '15%' }}>
          <LocaleFormattedMessage id="search.noResult" defaultMessage="No results found." />
        </h3>
      );
    }

    return results.map(result => (
      <Ayah
        ayah={ayahs[result.ayah]}
        match={result.match}
        key={result.ayah}
        tooltip={options.tooltip}
        isSearched
      />
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
          <div className="row">
            <div className="col-md-12">
              {this.renderBody()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const AsyncSearch = asyncConnect([{
  promise({ store: { dispatch }, location }) {
    if (__CLIENT__) {
      dispatch(search(location.query));
      return false;
    }

    return dispatch(search(location.query));
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

export default connect(mapStateToProps, { push })(AsyncSearch);
