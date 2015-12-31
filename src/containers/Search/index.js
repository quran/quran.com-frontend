import React, { Component, PropTypes } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { pushState } from 'redux-router';
import DocumentMeta from 'react-document-meta';
import qs from 'qs';

import { search, isQueried } from 'redux/modules/searchResults';

import createFontFaces from 'helpers/buildFontFaces';

import connectData from 'helpers/connectData';

import ImageHeader from 'components/ImageHeader';
import SearchInput from 'components/SearchInput';
import Ayah from 'components/Ayah';
import CoreLoader from 'components/CoreLoader';

const style = require('./style.scss');

function fetchData(getState, dispatch, location) {
  const query = qs.parse(location.search.slice(1));

  if (!isQueried(getState(), query)) {
    return dispatch(search(query));
  }
}

@connectData(fetchData, null)
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
  { pushState },
  (stateProps, dispatchProps, ownProps) => {
    const { ayahs, results } = stateProps;

    // TODO: Better manage duplication of this
    createFontFaces(
      results.map(key => ayahs[key])
    );

    return {
      ...stateProps, ...dispatchProps, ...ownProps
    };
  }
)
export default class Search extends Component {
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
    pushState: PropTypes.func.isRequired
  }

  shouldComponentUpdate(nextProps) {
    // Avoid double render when the pushState takes affect and changes the router props.
    return [
      this.props.isErrored !== nextProps.isErrored,
      this.props.isLoading !== nextProps.isLoading,
      this.props.total !== nextProps.total,
      this.props.page !== nextProps.page,
      this.props.size !== nextProps.size,
      this.props.results !== nextProps.results
    ].some(check => check);
  }

  onPaginate(payload) {
    const { pushState, query, page } = this.props; // eslint-disable-line no-shadow

    if (page !== payload.selected + 1) {
      return pushState(null, '/search', {p: payload.selected + 1, q: query});
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
                  clickCallback={this.onPaginate.bind(this)}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClass={style.active} />
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

    return results.map(key => {
      return (
        <Ayah ayah={ayahs[key]} key={key} isSearched />
      );
    });
  }

  render() {
    const { query } = this.props;

    return (
      <div>
        <DocumentMeta tite={`${query} - Qur'an Search - The Noble Qur'an - القرآن الكريم`} extend />
        <ImageHeader>
          <SearchInput value={query} />
        </ImageHeader>
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
