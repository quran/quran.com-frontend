import fontFaceReducer from '../../../src/redux/reducers/fontFaces';
import { LOAD_SUCCESS } from '../../../src/redux/constants/verses';
import { SEARCH_SUCCESS } from '../../../src/redux/constants/search';
import LOAD from '../../../src/redux/constants/fontFace';

describe('fontFace', () => {
  describe('LOAD_SUCCESS', () => {
    it('should reduce', () => {
      const pageNumber1 = 1;
      const pageNumber2 = 2;

      expect(
        fontFaceReducer(
          {},
          {
            type: LOAD_SUCCESS,
            result: {
              entities: {
                verses: {
                  1: { pageNumber: pageNumber1 },
                  2: { pageNumber: pageNumber2 }
                }
              }
            }
          }
        )
      ).toEqual({
        [`p${pageNumber1}`]: false,
        [`p${pageNumber2}`]: false
      });
    });

    it('should reduce when false', () => {
      const pageNumber1 = 1;
      const pageNumber2 = 2;

      expect(
        fontFaceReducer(
          { [`p${pageNumber1}`]: false, [`p${pageNumber2}`]: false },
          {
            type: LOAD_SUCCESS,
            result: {
              entities: {
                verses: {
                  1: { pageNumber: pageNumber1 },
                  2: { pageNumber: pageNumber2 }
                }
              }
            }
          }
        )
      ).toEqual({
        [`p${pageNumber1}`]: false,
        [`p${pageNumber2}`]: false
      });
    });

    it('should reduce true', () => {
      const pageNumber1 = 1;
      const pageNumber2 = 2;

      expect(
        fontFaceReducer(
          { [`p${pageNumber1}`]: true, [`p${pageNumber2}`]: true },
          {
            type: LOAD_SUCCESS,
            result: {
              entities: {
                verses: {
                  1: { pageNumber: pageNumber1 },
                  2: { pageNumber: pageNumber2 }
                }
              }
            }
          }
        )
      ).toEqual({
        [`p${pageNumber1}`]: true,
        [`p${pageNumber2}`]: true
      });
    });
  });

  describe('SEARCH_SUCCESS', () => {
    it('should reduce', () => {
      const pageNumber1 = 1;
      const pageNumber2 = 2;

      expect(
        fontFaceReducer(
          {},
          {
            type: SEARCH_SUCCESS,
            result: {
              entities: {
                verses: {
                  1: { pageNumber: pageNumber1 },
                  2: { pageNumber: pageNumber2 }
                }
              }
            }
          }
        )
      ).toEqual({
        [`p${pageNumber1}`]: false,
        [`p${pageNumber2}`]: false
      });
    });
  });

  describe('LOAD', () => {
    it('should reduce', () => {
      expect(
        fontFaceReducer({}, { type: LOAD, className: 'className' })
      ).toEqual({
        className: true
      });
    });
  });
});
