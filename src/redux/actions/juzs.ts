import { FETCH_JUZS } from '../constants/juzs';
import apiClient from '../../apiClient';

export function fetchJuzs() {
  return {
    type: FETCH_JUZS,
    promise: apiClient.get('/api/v3/juzs'),
  };
}

export type FetchJuzs = typeof fetchJuzs;
