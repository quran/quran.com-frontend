import { determinePage } from '../determinePage';

describe('determinePage', () => {
  it('returns empty object when no range passed', () => {
    expect(determinePage()).toEqual({});
  });

  it('returns empty object when range is invalid number', () => {
    expect(determinePage('h-i')).toEqual({});
  });

  it('return limit and offset when range is passed', () => {
    expect(determinePage('1-7')).toEqual({ limit: 6, offset: 0 });
  });

  it('returns limit and offset when only one number is passed', () => {
    expect(determinePage('5')).toEqual({ limit: 1, offset: 4 });
  });
});
