import { schema } from 'normalizr';

export const chaptersSchema = new schema.Entity('chapters', {}, { idAttribute: 'id' });
export const versesSchema = new schema.Entity('verses', {}, { idAttribute: 'id' });
export const bookmarksSchema = new schema.Entity('bookmarks', {}, { idAttribute: 'verseKey' });
export const footNoteSchema = new schema.Entity('foot_note', {}, { idAttribute: 'id' });

const schemas = {
  chaptersSchema,
  versesSchema,
  bookmarksSchema,
  footNoteSchema
};

export default schemas;
