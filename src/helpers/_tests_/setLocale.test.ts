import cookie from 'react-cookie';
import setLocale from '../setLocale';
import en from '../../locale/en';

jest.mock('react-cookie');

describe('setLocale helpers', () => {
  it('returns the en locale when req present', () => {
    expect(
      setLocale({
        query: {
          local: 'en',
        },
      })
    ).toEqual(en.messages);
    expect(cookie.save).toHaveBeenCalled();
  });

  it('returns the en locale when no req present', () => {
    cookie.load = jest.fn(() => 'en');

    expect(setLocale()).toEqual(en.messages);
    expect(cookie.save).toHaveBeenCalled();
  });
});
