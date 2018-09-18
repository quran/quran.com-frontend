import { mapStateToProps } from '../WordContainer';
import createStore from '../../redux/createStore';

const state = createStore().getState();

describe('WordContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(
        mapStateToProps(state, {
          word: { verseKey: '1:1' },
        })
      ).toEqual({
        tooltip: state.settings.tooltip,
        isNightMode: state.settings.isNightMode,
        isCurrentVersePlaying: false,
      });
    });
  });
});
