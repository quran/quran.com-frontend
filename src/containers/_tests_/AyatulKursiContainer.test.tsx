import { mapStateToProps } from '../AyatulKursiContainer';
import createStore from '../../redux/createStore';

const state = createStore().getState();

describe('AyatulKursiContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(mapStateToProps(state)).toEqual({
        chapter: state.chapters.entities[2],
        verses: state.verses.entities[2],
        chapters: state.chapters.entities,
        lines: state.lines.entities,
        isVersesLoading: state.verses.isLoading,
        isChapterLoading: state.chapters.isLoading,
        settings: state.settings,
      });
    });
  });
});
