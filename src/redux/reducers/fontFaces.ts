import { handle } from 'redux-pack';

import { FETCH_VERSES } from '../constants/verses';
import { FETCH_SEARCH } from '../constants/search';
import { FONT_FACE } from '../constants/fontFace';

type State = {
  [className: string]: boolean;
};
export const INITIAL_STATE: State = {};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_VERSES:
    case FETCH_SEARCH:
      return handle(state, action, {
        success: prevState => {
          return prevState;
          // const { verses } = action.payload;
          // const classNames: State = {};

          // if (verses) {
          //   Object.keys(verses).forEach(ayahId => {
          //     const verse = verses[ayahId];

          //     if (!state[`p${verse.pageNumber}`]) {
          //       classNames[`p${verse.pageNumber}`] = false;
          //     }
          //   });
          // }

          // return {
          //   ...prevState,
          //   ...classNames,
          // };
        },
      });

    case FONT_FACE:
      return {
        ...state,
        [action.className]: true,
      };

    default:
      return state;
  }
};
