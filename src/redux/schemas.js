import { Schema } from 'normalizr';

export const surahsSchema = new Schema('surahs');
export const ayahsSchema = new Schema('ayahs', { idAttribute: 'ayahKey' });
export const bookmarksSchema = new Schema('bookmarks', { idAttribute: 'ayahKey' });

const schemas = {
  surahsSchema,
  ayahsSchema,
  bookmarksSchema
};

export default schemas;
