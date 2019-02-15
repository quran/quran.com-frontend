import { mapStateToProps } from '../HomeContainer';
import createStore from '../../redux/createStore';

const state = createStore().getState();

describe('HomeContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(mapStateToProps(state)).toEqual({
        loadingChapters: state.chapters.isLoading,
        loadingJuzs: state.juzs.isLoading,
        chapters: state.chapters.entities,
        juzs: state.juzs.entities,
      });
    });
  });
});
