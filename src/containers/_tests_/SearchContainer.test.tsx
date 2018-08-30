import { mapStateToProps } from '../SearchContainer';
import createStore from '../../redux/createStore';

const state = createStore().getState();

describe('SearchContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(mapStateToProps(state)).toEqual({
        isErrored: state.search.errored,
        isLoading: state.search.isLoading,
        totalCount: state.search.totalCount,
        currentPage: state.search.currentPage,
        totalPages: state.search.totalPages,
        perPage: state.search.perPage,
        took: state.search.took,
        query: state.search.query,
        entities: state.search.entities,
        settings: state.settings,
      });
    });
  });
});
