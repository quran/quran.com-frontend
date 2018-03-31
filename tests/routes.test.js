import {
  getPromises,
  getMatchedRoute,
  checkOnEnterResult
} from '../src/routes';

const store = {
  getState: () => ({
    chapters: {
      entities: {}
    },
    verses: {
      entities: {}
    }
  }),
  dispatch: jest.fn()
};

describe('routes', () => {
  describe('#getPromises', () => {
    test('should return promises when route contains loadData field', () => {
      expect(getPromises('/1', store)).not.toHaveLength(0);
    });

    test('should not return promises when route does not contain loadData field', () => {
      expect(getPromises('/contact', store)).toHaveLength(0);
    });
  });

  describe('#getMatchedRoute', () => {
    test('should return a matched route when it matches', () => {
      expect(getMatchedRoute('/1')).toBeTruthy();
    });

    test('should not return a matched route when it matches', () => {
      expect(getMatchedRoute('/not-here')).toBeUndefined();
    });
  });

  describe('#checkOnEnterResult', () => {
    test('should not return a result', () => {
      expect(checkOnEnterResult('/1')).toBeNull();
      expect(checkOnEnterResult('/not-here')).toBeNull();
    });

    test('should return a result', () => {
      expect(checkOnEnterResult('/1/100')).toBeTruthy();
    });
  });
});
