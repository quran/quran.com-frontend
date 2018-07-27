import { handle } from 'redux-pack';
import { FETCH_VERSES } from '../constants/verses';
import { SET_CURRENT } from '../constants/chapters';

type State = {
  isLoading: boolean;
  lines: { [key: string]: $TsFixMe };
};

const INITIAL_STATE: State = {
  isLoading: false,
  lines: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case SET_CURRENT:
      return {
        ...state,
        lines: {},
      };
    case FETCH_VERSES:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
        }),
        finish: prevState => ({
          ...prevState,
          isLoading: false,
        }),
        success: prevState => {
          return prevState;
          const ayahs = action.result.entities.verses;
          const stateLines = state.lines;
          const lines = { ...stateLines };

          action.result.result.verses.forEach((ayahId: $TsFixMe) => {
            const ayah = ayahs[ayahId];

            ayah.words.forEach((word: $TsFixMe) => {
              if (lines[`${word.pageNumber}-${word.lineNumber}`]) {
                const isInArray = lines[
                  `${word.pageNumber}-${word.lineNumber}`
                ].find((item: $TsFixMe) => {
                  const itemChecksum = `${item.lineNumber}${item.code}${
                    item.verseKey
                  }${item.position}`;
                  const dataChecksum = `${word.lineNumber}${word.code}${
                    word.verseKey
                  }${item.position}`;

                  return itemChecksum === dataChecksum;
                });

                if (!isInArray) {
                  lines[`${word.pageNumber}-${word.lineNumber}`].push(word);
                }
              } else {
                lines[`${word.pageNumber}-${word.lineNumber}`] = [word];
              }
            });
          });

          return {
            ...prevState,
            loaded: true,
            loading: false,
            errored: false,
            lines,
          };
        },
      });
    default:
      return state;
  }
};
