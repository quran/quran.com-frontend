import { FETCH_RECITERS, FETCH_TRANSLATIONS } from '../constants/options';
import apiClient from '../../apiClient';

export const fetchTranslations = () => ({
  types: FETCH_TRANSLATIONS,
  promise: apiClient.get('/api/v3/options/translations'),
});

export const fetchRecitations = () => ({
  types: FETCH_RECITERS,
  promise: apiClient.get('/api/v3/options/recitations'),
});
