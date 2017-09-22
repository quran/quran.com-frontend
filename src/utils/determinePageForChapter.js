const determinePageForChapter = (range) => {
  let from;
  let to;

  if (range) {
    if (range.includes('-')) {
      [from, to] = range.split('-').map(value => parseInt(value, 10));

      if (isNaN(from) || isNaN(to)) return {};

      return {
        offset: from - 1,
        limit: to - from
      };
    }

    const offset = parseInt(range, 10);

    if (isNaN(offset)) return {};

    return {
      offset: offset - 1,
      limit: 1
    };
  }

  return { offset: 0, limit: 10 };
};

export default determinePageForChapter;
