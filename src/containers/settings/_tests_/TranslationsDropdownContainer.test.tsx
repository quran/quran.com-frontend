import { mapStateToProps } from '../TranslationsDropdownContainer';
import createStore from '../../../redux/createStore';

const state = createStore().getState();

describe('TranslationsDropdownContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(mapStateToProps(state)).toEqual({
        translationOptions: state.options.translations,
        translationSettings: state.settings.translations,
      });
    });
  });
});
