import { Schema } from 'normalizr';

const surahsSchema = new Schema('surahs');
const ayahsSchema = new Schema('ayahs', { idAttribute: 'ayahKey' });
const bookmarksSchema = new Schema('bookmarks', { idAttribute: 'ayahKey' });

const schemas = {
  surahsSchema,
  ayahsSchema,
  bookmarksSchema
};

export default schemas;
