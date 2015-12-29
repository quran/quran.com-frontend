import {
  LOAD as AYAHS_LOAD,
  LOAD_SUCCESS as AYAHS_LOAD_SUCCESS,
  LOAD_FAIL as AYAHS_LOAD_FAIL
} from './ayahs';

const initialState = {
  lines: [],
  lastLine: -1
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AYAHS_LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case AYAHS_LOAD_SUCCESS:
      // the line data structure will be a two-dimensional array:
      // the structure is a set of lines and each line is a set of words
      // like this:
      // [ [ word, word, word, word, word ],
      //   [ word, word, word, word, word ],
      //   [ word, word, word, word, word ],
      //   [ word, word, word, word, word ],
      //   [ word, word, word, word, word ] ]
      //
      // how this is rendered:
      // first lines is left aligned
      // middle lines are justified middle lines are justified
      // middle lines are justified middle lines are justified
      // middle lines are justified middle lines are justified
      //                            last line is right aligned
      //
      // not implemented yet:
      // prepending (if we allow prepending)

      const lines = [];
      let lastLine = -1;

    //   if (this.ayahs === ayahs) {
    //   // if the 'ayahs' passed in are exactly the same as this.ayahs, then
    //   // we want to rebuild the whole set of lines instead of append/prepend:
    //   this.lines = [];
    //   this.lastLine = -1;
    // }
      const ayahs = action.result.entities.ayahs;

      action.result.result.forEach(ayahId => {
        const ayah = ayahs[ayahId];

        ayah.quran.forEach(data => {
          if (data.char.line !== lastLine) {
            // new line
            lines[lines.length] = [];
            lastLine = data.char.line;
          }
          lines[lines.length - 1].push(data);
        });
      });

      return {
        ...state,
        loaded: true,
        loading: false,
        errored: false,
        lines: lines,
        lastLine: lastLine
      };
    case AYAHS_LOAD_FAIL:
      console.log(action);
      return state;
    default:
      return state;
  }
}
