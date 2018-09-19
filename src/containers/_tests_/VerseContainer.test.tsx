import { mapStateToProps } from '../VerseContainer';
import createStore from '../../redux/createStore';
import { getVerse } from '../../../tests/fixtures/verse';

const state = createStore().getState();

describe('VerseContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(
        mapStateToProps(state, {
          verse: getVerse(1, 1),
        })
      ).toEqual({
        tooltip: state.settings.tooltip,
        userAgent: state.settings.userAgent,
        audio: state.settings.audio,
        isCurrentVersePlaying: false,
      });
    });
  });
});
