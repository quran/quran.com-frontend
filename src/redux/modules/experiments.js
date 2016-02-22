export const START = '@@sparrow/experiments/START';
export const STOP = '@@sparrow/experiments/STOP';
export const SET_STATE = '@@sparrow/experiments/SET_STATE';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START:
      return {
        ...state,
        [action.experiment]: true
      };
    case STOP:
      return {
        ...state,
        [action.experiment]: false
      };
    case SET_STATE:
      return {
        ...state,
        [action.experiment]: action.state
      };
    default:
      return state;
  }
}
