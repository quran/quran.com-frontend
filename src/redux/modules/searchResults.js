import { ayahsSchema } from '../schemas';
import { arrayOf } from 'normalizr';

import { createFontFacesArray } from '../../helpers/buildFontFaces';

export const SEARCH = '@@quran/search/LOAD';
export const SEARCH_SUCCESS = '@@quran/search/LOAD_SUCCESS';
export const SEARCH_FAIL = '@@quran/search/LOAD_FAIL';

const initialState = {
  errored: false,
  loaded: false,
  entities: {},
  results: [],
  fontFaces: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        loaded: false,
        loading: true
        // query: action.params.q || action.params.query,
        // page: action.params.p || action.params.page
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        errored: false,
        total: action.result.result.total,
        page: action.result.result.page,
        size: action.result.result.size,
        from: action.result.result.from,
        took: action.result.result.took,
        query: action.result.result.query,
        results: action.result.result.results,
        entities: Object.assign({}, state.entities, action.result.entities.ayahs),
        fontFaces: [].concat(state.fontFaces, createFontFacesArray(
          action.result.result.results.map(result => action.result.entities.ayahs[result.ayah])
        ))
      };
    case SEARCH_FAIL:
      return {
        ...state,
        errored: true
      };
    default:
      return state;
  }
}

export function search(params) {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    schema: {results: arrayOf({ayah: ayahsSchema})},
    promise: (client) => client.get('/v2/search', { params }),
    params
  };
}

export function isQueried() {
  return false;
}
