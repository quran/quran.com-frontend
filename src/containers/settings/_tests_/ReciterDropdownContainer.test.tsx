import { mapStateToProps } from '../ReciterDropdownContainer';
import createStore from '../../../redux/createStore';

const state = createStore().getState();

describe('ReciterDropdownContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(mapStateToProps(state)).toEqual({
        recitationsOptions: state.options.recitations,
        audioSetting: state.settings.audio,
      });
    });
  });
});
