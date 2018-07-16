import fontFaceReducer from '../../../src/redux/reducers/fontFaces';
import { LOAD_SUCCESS } from '../../../src/redux/constants/verses';
import { SEARCH } from '../../../src/redux/constants/search';
import FONT_FACE from '../../../src/redux/constants/fontFace';

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

  describe('SEARCH.SUCCESS', () => {
    it('should reduce', () => {
      const pageNumber1 = 1;
      const pageNumber2 = 2;

      expect(
        fontFaceReducer(
          {},
          {
            type: SEARCH.SUCCESS,
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

  describe('FONT_FACE', () => {
    it('should reduce', () => {
      expect(
        fontFaceReducer({}, { type: FONT_FACE.ACTION, className: 'className' })
      ).toEqual({
        className: true
      });
    });
  });
});
