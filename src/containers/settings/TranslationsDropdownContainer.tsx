import { connect } from 'react-redux';
import { fetchTranslations } from '../../redux/actions/options';
import { setSetting } from '../../redux/actions/settings';
import ReduxState from '../../types/ReduxState';
import TranslationsDropdown from '../../components/settings/TranslationsDropdown';

export default connect(
  (state: ReduxState) => ({
    translationOptions: state.options.translations,
    translationSettings: state.settings.translations,
  }),
  { fetchTranslations, setSetting }
)(TranslationsDropdown);
