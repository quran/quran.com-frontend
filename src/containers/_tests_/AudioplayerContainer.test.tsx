import { mapStateToProps } from '../AudioplayerContainer';
import createStore from '../../redux/createStore';
import { chapter } from '../../../tests/fixtures/chapters';

const state = createStore().getState();

describe('AudioplayerContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(
        mapStateToProps(state, {
          chapter,
        })
      ).toEqual({
        segments: state.audioplayer.segments[chapter.id],
        isPlaying: state.audioplayer.isPlaying,
        repeat: state.audioplayer.repeat,
        shouldScroll: state.audioplayer.shouldScroll,
        duration: state.audioplayer.duration,
        currentTime: state.audioplayer.currentTime,
        currentVerseKey: state.audioplayer.currentVerseKey,
        currentFile: undefined,
        files: state.audioplayer.files[chapter.id],
        audioSetting: state.settings.audio,
      });
    });
  });
});
