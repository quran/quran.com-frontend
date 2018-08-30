import { mapStateToProps } from '../PageViewContainer';
import createStore from '../../../redux/createStore';

const state = createStore().getState();

describe('PageViewContainer', () => {
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      expect(mapStateToProps(state)).toEqual({
        userAgent: state.settings.userAgent,
      });
    });
  });
});
