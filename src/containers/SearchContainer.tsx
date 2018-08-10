import { connect } from 'react-redux';
import ReduxState from '../types/ReduxState';
import Search from '../components/Search';
import { fetchSearch } from '../redux/actions/search';

const mapStateToProps = (state: ReduxState) => ({
  isErrored: state.search.errored,
  isLoading: state.search.isLoading,
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

export default connect(
  mapStateToProps,
  { fetchSearch }
)(Search);
