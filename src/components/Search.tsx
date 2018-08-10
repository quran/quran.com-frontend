import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PropTypes as MetricsPropTypes } from 'react-metrics';
import Helmet from 'react-helmet';
import ReactPaginate from 'react-paginate';
import Loader from 'quran-components/lib/Loader';
import { FormattedHTMLMessage } from 'react-intl';
import { History } from 'history';
import Jumbotron from './Jumbotron';
import VerseContainer from '../containers/VerseContainer';
import T, { KEYS } from './T';
import { VerseShape } from '../shapes';
import SettingsShape from '../shapes/SettingsShape';
import { FetchSearch } from '../redux/actions/search';

const Header = styled.div`
  background-color: #e7e6e6;
  min-height: 50px;
  padding: 15px 0;
  color: #414141;
  font-weight: 400;

  .pagination {
    margin: 0;

    & > li:first-child > a,
    & > li:last-child > a {
      font-size: 14px;

      &.disabled {
        opacity: 0.5;
      }
    }

    & > li {
      &.active {
        a {
          color: $brand-primary;
        }
      }

      &.disabled {
        opacity: 0.5;
      }
    }

    & > li > a {
      background: transparent;
      border: none;
      color: #414141;
      float: initial;
      padding: 6px 18px;
      font-weight: 300;
      font-size: 14px;

      &:hover,
      &:focus {
        background: initial;
      }

      i {
        font-size: 12px;
      }
    }

    .selected a {
      color: ${props => props.theme.brandPrimary};
    }

    @media (max-width: ${props => props.theme.screen.sm}) {
      padding-top: 5px;
    }
  }
`;

const propTypes = {
  isErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.string),
  entities: PropTypes.arrayOf(VerseShape),
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      q: PropTypes.string,
      p: PropTypes.string,
    }),
  }).isRequired,
  settings: SettingsShape.isRequired,
  fetchSearch: PropTypes.func.isRequired,
};

const defaultProps: { results: Array<string>; entities: Array<string> } = {
  results: [],
  entities: [],
};

const contextTypes = {
  metrics: MetricsPropTypes.metrics,
};

type Props = {
  isErrored: boolean;
  isLoading: boolean;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  query: string;
  results: Array<string>;
  entities: Array<VerseShape>;
  location: { query: { q?: string; p?: string } };
  settings: SettingsShape;
  fetchSearch: FetchSearch;
  history: History;
};

class Search extends Component<Props> {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  static contextTypes = contextTypes;

  bootstrap() {
    const { fetchSearch, location } = this.props;

    return fetchSearch(location.query || location.q);
  }

  handlePageChange = (payload: $TsFixMe) => {
    const {
      history: { push },
      query,
      currentPage,
    } = this.props;
    const { metrics } = this.context;

    const selectedPage = payload.selected + 1;

    if (currentPage !== selectedPage) {
      metrics.track('Search', {
        action: 'paginate',
        label: `${query} - ${selectedPage}`,
      });

      return push({
        pathname: '/search',
        search: '{ p: selectedPage, q: query }',
      });
    }

    return true;
  };

  renderStatsBar() {
    const { totalCount, totalPages, currentPage, query, perPage } = this.props;
    const from = Math.max(...[(currentPage - 1) * perPage, 1]);
    const to = Math.min(...[currentPage * perPage, totalCount]);
    const values = { from, to, query, total: totalCount };

    if (totalPages) {
      return (
        <Header>
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
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageChange}
                  containerClassName="pagination"
                  pageLinkClassName="pointer"
                  pageCount={totalPages}
                />
              </div>
            </div>
          </div>
        </Header>
      );
    }

    return false;
  }

  renderBody() {
    const {
      isErrored,
      isLoading,
      results,
      entities,
      location: { query },
    } = this.props;

    if (!query || !query.q) {
      return (
        <h3 className="text-center" style={{ padding: '15%' }}>
          <T id={KEYS.SEARCH_NOTHING} />
        </h3>
      );
    }

    if (isErrored) {
      return (
        <h3 className="text-center" style={{ padding: '15%' }}>
          <T id={KEYS.SEARCH_ERROR} />
        </h3>
      );
    }

    if (isLoading) {
      return <Loader isActive={isLoading} />;
    }

    if (!results.length) {
      return (
        <h3 className="text-center" style={{ padding: '15%' }}>
          <T id={KEYS.SEARCH_NO_RESULT} />
        </h3>
      );
    }

    return results.map(result => (
      <VerseContainer
        verse={entities[result]}
        match={entities[result].match}
        key={entities[result].verseKey}
        isSearched
      />
    ));
  }

  render() {
    const { query, settings } = this.props;

    return (
      <div className="index-page">
        <Helmet
          title={query}
          style={[
            {
              cssText: `.text-arabic{font-size: ${settings.fontSize.arabic}rem;}
            .text-translation{font-size: ${settings.fontSize.translation}rem;}`,
            },
          ]}
        />
        <Jumbotron />
        {this.renderStatsBar()}
        <div className="container surah-list">
          <div className="row">
            <div className="col-md-12">{this.renderBody()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
