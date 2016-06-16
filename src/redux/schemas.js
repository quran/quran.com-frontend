import { Schema } from 'normalizr';

const surahsSchema = new Schema('surahs');
const ayahsSchema = new Schema('ayahs', { idAttribute: 'ayahKey' });

const schemas = {
  surahsSchema,
  ayahsSchema
};

export default schemas;
