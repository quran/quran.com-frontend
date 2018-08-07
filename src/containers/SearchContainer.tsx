import { connect } from 'react-redux';
import ReduxState from '../types/ReduxState';
// ({ store: { dispatch }, location }) => {
//   if (__CLIENT__) {
//     dispatch(search(location.query || location.q));
//     return false;
//   }

//   return dispatch(search(location.query || location.q));
// },

const mapStateToProps = (state: ReduxState) => ({
  isErrored: state.search.errored,
  isLoading: state.search.loading,
  totalCount: state.search.totalCount,
  currentPage: state.search.currentPage,
  totalPages: state.search.totalPages,
  perPage: state.search.perPage,
  took: state.search.took,
  query: state.search.query,
  results: state.search.results,
  entities: state.search.entities,
  settings: state.settings,
});

export default connect(mapStateToProps)(Search);
