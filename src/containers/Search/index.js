import React, { Component, PropTypes } from 'react';
import { PropTypes as MetricsPropTypes } from 'react-metrics';

import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import ReactPaginate from 'react-paginate';
import { FormattedHTMLMessage } from 'react-intl';
import IndexHeader from 'components/IndexHeader';

import Verse from 'components/Verse';
import Loader from 'quran-components/lib/Loader';

import { search } from 'redux/actions/search.js';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { verseType, optionsType } from 'types';

const style = require('./style.scss');

class Search extends Component {
  static propTypes = {
    isErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    totalCount: PropTypes.number,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    perPage: PropTypes.number,
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.string),
    entities: PropTypes.arrayOf(verseType),
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({ // eslint-disable-line
      q: PropTypes.string,
      p: PropTypes.string
    }),
    options: optionsType
  };

  static defaultProps = {
    results: []
  };

  static contextTypes = {
    metrics: MetricsPropTypes.metrics
  };

  handlePageChange = (payload) => {
    const { push, query, currentPage } = this.props; // eslint-disable-line no-shadow
    const selectedPage = payload.selected + 1;

    if (currentPage !== selectedPage) {
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
    const { totalCount, totalPages, currentPage, query, perPage } = this.props;
    const from = Math.max(...[(currentPage - 1) * perPage, 1]);
    const to = Math.min(...[currentPage * perPage, totalCount]);
    const values = { from, to, query, total: totalCount };

    if (totalPages) {
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
                  pageNum={currentPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  initialSelected={currentPage}
                  forceSelected={currentPage}
                  onPageChange={this.handlePageChange}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  pageLinkClassName="pointer"
                  activeClass={style.active}
                  pageCount={totalPages}
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
    const { isErrored, isLoading, results, entities, options, location: { query } } = this.props;

    if (isLoading) {
      return <Loader isActive={isLoading} />;
    }

    if (!query || !query.q) {
      return (
        <h3 className="text-center" style={{ padding: '15%' }}>
          <LocaleFormattedMessage id="search.nothing" defaultMessage="No search query." />
        </h3>
      );
    }

    if (isErrored) {
      return (
        <h3 className="text-center" style={{ padding: '15%' }}>
          <LocaleFormattedMessage id="search.error" defaultMessage="Sorry, there was an error with your search." />
        </h3>
      );
    }

    if (!results.length) {
      return (
        <h3 className="text-center" style={{ padding: '15%' }}>
          <LocaleFormattedMessage id="search.noResult" defaultMessage="No results found." />
        </h3>
      );
    }

    return results.map(result => (
      <Verse
        verse={result}
        // match={entities[result].match}
        key={result.verseKey}
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
        <IndexHeader />
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
      dispatch(search(location.query || location.q));
      return false;
    }

    return dispatch(search(location.query || location.q));
  }
}])(Search);

function mapStateToProps(state) {
  return {
    isErrored: state.searchResults.errored,
    isLoading: state.searchResults.loading,
    totalCount: state.searchResults.totalCount,
    currentPage: state.searchResults.currentPage,
    totalPages: state.searchResults.totalPages,
    perPage: state.searchResults.perPage,
    took: state.searchResults.took,
    query: state.searchResults.query,
    results: state.searchResults.results,
    entities: state.searchResults.entities,
    options: state.options
  };
}

export default connect(mapStateToProps, { push })(AsyncSearch);
