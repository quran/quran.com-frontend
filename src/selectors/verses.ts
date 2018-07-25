import { ReduxState, ChapterId } from '../types';

// eslint-disable-next-line
export const isLoaded = (
  state: ReduxState,
  chapterId: ChapterId,
  paging: $TsFixMe = {},
  perPage: 20 = 20
) => {
  if (paging.offset) {
    return (
      state.verses.entities[chapterId] &&
      state.verses.entities[chapterId][
        `${chapterId}:${paging.offset ? paging.offset + 1 : 1}`
      ] &&
      state.verses.entities[chapterId][
        `${chapterId}:${
          paging.offset && paging.limit ? paging.offset + paging.limit : perPage
        }`
      ]
    );
  }

  return (
    state.verses.entities[chapterId] &&
    state.verses.entities[chapterId][`${chapterId}:1`]
  );
};
