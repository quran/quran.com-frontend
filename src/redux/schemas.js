import { schema } from 'normalizr';

export const surahsSchema = new schema.Entity('surahs');
export const ayahsSchema = new schema.Entity('ayahs', {}, { idAttribute: 'ayahKey' });
export const bookmarksSchema = new schema.Entity('bookmarks', {}, { idAttribute: 'ayahKey' });

const schemas = {
  surahsSchema,
  ayahsSchema,
  bookmarksSchema
};

export default schemas;
