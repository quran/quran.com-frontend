import routeFilters, {
  INVALID_VERSE_URL,
  INVALID_CHAPTER_URL
} from '../../src/utils/routeFilters';

describe('routeFilters', () => {
  test('should validate /bad', () => {
    expect(
      routeFilters({
        params: { chapterId: 'bad' },
        location: { pathname: '/bad', search: '' }
      })
    ).toEqual({
      status: 400,
      url: INVALID_CHAPTER_URL
    });
  });

  test('should validate /bad/path', () => {
    expect(
      routeFilters({
        params: { chapterId: 'bad', range: 'path' },
        location: { pathname: '/bad/path', search: '' }
      })
    ).toEqual({
      status: 400,
      url: INVALID_CHAPTER_URL
    });
  });

  test('should validate /1/bad', () => {
    expect(
      routeFilters({
        params: { chapterId: '1', range: 'bad' },
        location: { pathname: '/1/bad', search: '' }
      })
    ).toEqual({
      status: 400,
      url: INVALID_VERSE_URL
    });
  });

  test('should validate /1/1-1', () => {
    expect(
      routeFilters({
        params: { chapterId: '1', range: '1-1' },
        location: { pathname: '/1/1-1', search: '' }
      })
    ).toEqual({
      status: 301,
      url: '/1/1'
    });
  });

  test('should validate /1/120', () => {
    expect(
      routeFilters({
        params: { chapterId: '1', range: '120' },
        location: { pathname: '/1/120', search: '' }
      })
    ).toEqual({
      status: 400,
      url: INVALID_VERSE_URL
    });
  });

  test('should validate /1/001', () => {
    expect(
      routeFilters({
        params: { chapterId: '1', range: '001' },
        location: { pathname: '/1/001', search: '' }
      })
    ).toEqual({
      status: 301,
      url: '/1/1'
    });
  });

  test('should validate /1:', () => {
    expect(
      routeFilters({
        params: { chapterId: '1', range: '' },
        location: { pathname: '/1:', search: '' }
      })
    ).toEqual({
      status: 301,
      url: '/1'
    });
  });

  test('should validate /115', () => {
    expect(
      routeFilters({
        params: { chapterId: '115', range: '' },
        location: { pathname: '/115:', search: '' }
      })
    ).toEqual({
      status: 400,
      url: INVALID_CHAPTER_URL
    });
  });

  test('should validate /001/1', () => {
    expect(
      routeFilters({
        params: { chapterId: '001', range: '1' },
        location: { pathname: '/001/1', search: '' }
      })
    ).toEqual({
      status: 301,
      url: '/1/1'
    });
  });

  test('should validate /001', () => {
    expect(
      routeFilters({
        params: { chapterId: '001' },
        location: { pathname: '/001', search: '' }
      })
    ).toEqual({
      status: 301,
      url: '/1'
    });
  });

  test('should validate /1:120', () => {
    expect(
      routeFilters({
        params: { chapterId: '1', range: '120' },
        location: { pathname: '/1:120', search: '' }
      })
    ).toEqual({
      status: 400,
      url: INVALID_VERSE_URL
    });
  });

  test('should validate /1:1', () => {
    expect(
      routeFilters({
        params: { chapterId: '1', range: '1' },
        location: { pathname: '/1:1', search: '' }
      })
    ).toEqual({
      status: 301,
      url: '/1/1'
    });
  });

  test('should validate /1/1:2', () => {
    expect(
      routeFilters({
        params: { chapterId: '1', range: '1:2' },
        location: { pathname: '/1/1:2', search: '' }
      })
    ).toEqual({
      status: 301,
      url: '/1/1-2'
    });
  });
});
