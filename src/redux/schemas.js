import { schema } from 'normalizr';

export const chaptersSchema = new schema.Entity('chapters', {}, { idAttribute: 'id' });
export const ayahsSchema = new schema.Entity('ayahs', {}, { idAttribute: 'ayahKey' });
export const bookmarksSchema = new schema.Entity('bookmarks', {}, { idAttribute: 'ayahKey' });

const schemas = {
  chaptersSchema,
  ayahsSchema,
  bookmarksSchema
};

export default schemas;
