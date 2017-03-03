import { schema } from 'normalizr';

export const chaptersSchema = new schema.Entity('chapters', {}, { idAttribute: 'id' });
export const versesSchema = new schema.Entity('verses', {}, { idAttribute: 'id' });
export const bookmarksSchema = new schema.Entity('bookmarks', {}, { idAttribute: 'verseKey' });

const schemas = {
  chaptersSchema,
  versesSchema,
  bookmarksSchema
};

export default schemas;
