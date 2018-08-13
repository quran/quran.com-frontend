import makeHelmetTags from '../makeHelmetTags';

const title = 'Quran.com';
const description = 'Quran.com website';
const url = 'https://quran.com';
const image = 'source/to/image';

describe('makeHelmetTags helpers', () => {
  it('returns correct title tags', () => {
    expect(makeHelmetTags({ title })).toEqual({
      meta: [
        { content: title, property: 'og:site_name' },
        { content: title, property: 'og:title' },
        { content: title, name: 'twitter:title' },
      ],
      title,
    });
  });

  it('returns correct description tags', () => {
    expect(makeHelmetTags({ description })).toEqual({
      description,
      meta: [
        { content: description, name: 'description' },
        { content: description, property: 'og:description' },
        { content: description, name: 'twitter:description' },
      ],
    });
  });

  it('returns correct url tags', () => {
    expect(makeHelmetTags({ url })).toEqual({
      meta: [
        { content: url, property: 'og:url' },
        { content: url, name: 'twitter:url' },
      ],
    });
  });

  it('returns correct image tags', () => {
    expect(makeHelmetTags({ image })).toEqual({
      meta: [
        { content: image, property: 'og:image' },
        { content: image, name: 'twitter:image' },
      ],
    });
  });
});
