import toNumber from 'lodash/toNumber';

// eslint-disable-next-line
export const determinePage = (range?: string) => {
  let from;
  let to;

  if (range) {
    if (range.includes('-')) {
      [from, to] = range.split('-').map(toNumber);

      if (isNaN(from) || isNaN(to)) return {};

      return {
        offset: from - 1,
        limit: to - from,
      };
    }

    const offset = toNumber(range);

    if (isNaN(offset)) return {};

    return {
      offset: offset - 1,
      limit: 1,
    };
  }

  return {};
};
