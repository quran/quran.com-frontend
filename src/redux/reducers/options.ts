import camelcaseKeys from 'camelcase-keys';
import { handle } from 'redux-pack';
import {
  FETCH_RECITERS,
  FETCH_TRANSLATIONS,
  FETCH_TAFSIRS,
} from '../constants/options';
import { TranslationShape, ReciterShape } from '../../shapes';

type State = {
  recitations: Array<ReciterShape>;
  translations: Array<TranslationShape>;
  tafsirs: Array<$TsFixMe>;
  isLoadingRecitations: boolean;
  isLoadingTranslations: boolean;
  isLoadingTafsirs: boolean;
};

export const INITIAL_STATE: State = {
  recitations: [],
  translations: [],
  tafsirs: [],
  isLoadingRecitations: false,
  isLoadingTranslations: false,
  isLoadingTafsirs: false,
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_RECITERS: {
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoadingRecitations: true,
        }),
        finish: prevState => ({
          ...prevState,
          isLoadingRecitations: false,
        }),
        success: prevState => ({
          ...prevState,
          recitations: action.payload.recitations.map((obj: $TsFixMe) =>
            camelcaseKeys(obj || {})
          ),
        }),
      });
    }
    case FETCH_TRANSLATIONS: {
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoadingTranslations: true,
        }),
        finish: prevState => ({
          ...prevState,
          isLoadingTranslations: false,
        }),
        success: prevState => ({
          ...prevState,
          translations: action.payload.translations.map((obj: $TsFixMe) =>
            camelcaseKeys(obj || {})
          ),
        }),
      });
    }
    case FETCH_TAFSIRS: {
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoadingTafsirs: true,
        }),
        finish: prevState => ({
          ...prevState,
          isLoadingTafsirs: false,
        }),
        success: prevState => ({
          ...prevState,
          tafsirs: action.payload.tafsirs.map((obj: $TsFixMe) =>
            camelcaseKeys(obj || {})
          ),
        }),
      });
    }
    default:
      return state;
  }
};
