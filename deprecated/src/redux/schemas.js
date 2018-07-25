import { schema } from 'normalizr';

export const chaptersSchema = new schema.Entity(
  'chapters',
  {},
  { idAttribute: 'id' }
);
export const versesSchema = new schema.Entity(
  'verses',
  {},
  { idAttribute: 'verseKey' }
);
export const bookmarksSchema = new schema.Entity(
  'bookmarks',
  {},
  { idAttribute: 'verseKey' }
);
export const juzsSchema = new schema.Entity('juzs', {}, { idAttribute: 'id' });

const schemas = {
  chaptersSchema,
  versesSchema,
  bookmarksSchema,
  juzsSchema,
};

export default schemas;
