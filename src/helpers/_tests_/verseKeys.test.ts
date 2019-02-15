import { isValidVerseKey, nextVerseKey, previousVerseKey } from '../verseKeys';

describe('verseKeys', () => {
  describe('isValidVerseKey', () => {
    it('returns valid', () => {
      expect(isValidVerseKey('1:1')).toBeTruthy();
      expect(isValidVerseKey('1:7')).toBeTruthy();
    });

    it('returns invalid', () => {
      expect(isValidVerseKey('115:1')).toBeFalsy();
      expect(isValidVerseKey('1:8')).toBeFalsy();
    });
  });

  describe('nextVerseKey', () => {
    it('returns the next verse key', () => {
      expect(nextVerseKey('1:1')).toEqual('1:2');
    });

    it('returns the null when given end of chapter', () => {
      expect(nextVerseKey('1:7')).toBeNull();
    });

    it('returns the null when given invalid verse key', () => {
      expect(nextVerseKey('1:8')).toBeNull();
    });
  });

  describe('previousVerseKey', () => {
    it('returns the next verse key', () => {
      expect(previousVerseKey('1:2')).toEqual('1:1');
    });

    it('returns the null when given end of chapter', () => {
      expect(previousVerseKey('1:1')).toBeNull();
    });

    it('returns the null when given invalid verse key', () => {
      expect(previousVerseKey('1:9')).toBeNull();
    });
  });
});
