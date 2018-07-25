import { ReduxState } from '../../types';
import { juzsSchema } from '../schemas';
import { FETCH_JUZS } from '../constants/juzs';
import apiClient from '../../apiClient';

export function fetchJuzs() {
  return {
    type: FETCH_JUZS,
    schema: { juzs: [juzsSchema] },
    promise: apiClient.get('/api/v3/juzs'),
  };
}

export function isJuzsLoaded(state: ReduxState) {
  return Object.keys(state.juzs.entities).length === 30;
}

export type FetchJuzs = typeof fetchJuzs;
