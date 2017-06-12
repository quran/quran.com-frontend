import { juzsSchema } from 'redux/schemas';
import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from 'redux/constants/juzs.js';

export function loadJuzs() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: { juzs: [juzsSchema] },
    promise: client => client.get('/api/v3/juzs')
  };
}

export function isJuzsLoaded(globalState) {
  return Object.keys(globalState.juzs.entities).length === 30;
}
