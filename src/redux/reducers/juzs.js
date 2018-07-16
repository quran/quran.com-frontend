import { handleActions } from 'redux-actions';

import { FETCH_JUZS } from '../constants/juzs';

export const INITIAL_STATE = {
  errored: false,
  loaded: false,
  entities: {}
};

export default handleActions(
  {
    [FETCH_JUZS.SUCCESS]: (state, { result }) => {
      const { juzs } = result.entities;

      return {
        ...state,
        loaded: true,
        entities: {
          ...state.entities,
          ...juzs
        }
      };
    },
    [FETCH_JUZS.FAILURE]: state => ({
      ...state,
      errored: true
    }),
    [FETCH_JUZS.ACTION]: state => ({
      ...state
    })
  },
  INITIAL_STATE
);
