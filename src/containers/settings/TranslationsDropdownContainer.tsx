import { connect } from 'react-redux';
import { fetchTranslations } from '../../redux/actions/options';
import { setSetting } from '../../redux/actions/settings';
import ReduxState from '../../types/ReduxState';
import TranslationsDropdown from '../../components/settings/TranslationsDropdown';

export const mapStateToProps = (state: ReduxState) => ({
  translationOptions: state.options.translations,
  translationSettings: state.settings.translations,
})

export default connect(
  mapStateToProps,
  { fetchTranslations, setSetting }
)(TranslationsDropdown);
