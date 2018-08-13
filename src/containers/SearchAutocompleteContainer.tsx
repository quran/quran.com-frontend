// TODO: Should be handled by redux and not component states.
import { connect } from 'react-redux';
import { fetchSuggest } from '../redux/actions/suggest';
import SearchAutocomplete from '../components/SearchAutocomplete';
import ReduxState from '../types/ReduxState';

type Props = {
  value: string;
};

function mapStateToProps(state: ReduxState, ownProps: Props) {
  const chapters = state.chapters.entities;
  const suggestions = state.suggest.results[ownProps.value];
  const lang = 'en';

  return {
    chapters,
    suggestions,
    lang,
  };
}

export default connect(
  mapStateToProps,
  { fetchSuggest }
)(SearchAutocomplete);
