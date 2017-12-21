import { juzsSchema } from '../schemas';
import { FETCH_JUZS } from '../constants/juzs';

export function loadJuzs() {
  return {
    types: [FETCH_JUZS.ACTION, FETCH_JUZS.SUCCESS, FETCH_JUZS.FAILURE],
    schema: { juzs: [juzsSchema] },
    promise: client => client.get('/api/v3/juzs')
  };
}

export function isJuzsLoaded(globalState) {
  return Object.keys(globalState.juzs.entities).length === 30;
}
