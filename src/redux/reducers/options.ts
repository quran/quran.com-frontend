import { handle } from 'redux-pack';
import { FETCH_RECITERS, FETCH_TRANSLATIONS } from '../constants/options';

type State = {
  recitations: Array<number>;
  translations: Array<number>;
  isLoadingRecitations: boolean;
  isLoadingTranslations: boolean;
};

export const INITIAL_STATE: State = {
  recitations: [],
  translations: [],
  isLoadingRecitations: false,
  isLoadingTranslations: false,
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
          recitations: action.result.recitations,
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
          recitations: action.result.translations,
        }),
      });
    }
    default:
      return state;
  }
};
