import { handleActions } from 'redux-actions';

import { FETCH_JUZS } from '..//constants/juzs';

export const INITIAL_STATE = {
  errored: false,
  loaded: false,
  loading: false,
  entities: {}
};

export default handleActions(
  {
    [FETCH_JUZS.SUCCESS]: (state, action) => {
      const entities = state.entities;
      const { juzs } = action.result.entities;
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: {
          ...entities,
          ...juzs
        }
      };
    },
    [FETCH_JUZS.FAILURE]: state => ({
      ...state,
      errored: true,
      loading: false
    }),
    [FETCH_JUZS.ACTION]: state => ({
      ...state,
      loading: true
    })
  },
  INITIAL_STATE
);
