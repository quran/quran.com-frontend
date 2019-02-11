import camelcaseKeys from 'camelcase-keys';
import keyBy from 'lodash/keyBy';
import { handle } from 'redux-pack';
import { FETCH_VERSES } from '../constants/verses';
import { VerseShape, LineShape } from '../../shapes';

type State = {
  isLoading: boolean;
  entities: { [key: string]: LineShape };
};

export const INITIAL_STATE: State = {
  isLoading: false,
  entities: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
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
          const verses = camelcaseKeys(
            keyBy(action.payload.verses, 'verse_key'),
            { deep: true }
          );
          const lines = prevState.entities;

          Object.values(verses).forEach((verse: VerseShape) => {
            verse.words.forEach((word: $TsFixMe) => {
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
            lines,
          };
        },
      });
    default:
      return state;
  }
};
