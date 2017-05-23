function replaceChapterOrRange(params) {
  const chapterId = params.chapterId;
  const verseId = params.range;

  return (
    chapterId.length !== parseInt(chapterId, 10).toString().length ||
    (verseId && verseId.length !== parseInt(verseId, 10).toString().length)
  );
}

function filterValidChapter(replaceState, chapterId) {
  if (isNaN(chapterId) || chapterId > 114 || chapterId < 1) {
    replaceState('/error/invalid-surah');
  }
}

function filterValidVerse(replaceState, chapterId, verseRange) {
  const chapterToVersesMap = {
    1: 7,
    2: 286,
    3: 200,
    4: 176,
    5: 120,
    6: 165,
    7: 206,
    8: 75,
    9: 129,
    10: 109,
    11: 123,
    12: 111,
    13: 43,
    14: 52,
    15: 99,
    16: 128,
    17: 111,
    18: 110,
    19: 98,
    20: 135,
    21: 112,
    22: 78,
    23: 118,
    24: 64,
    25: 77,
    26: 227,
    27: 93,
    28: 88,
    29: 69,
    30: 60,
    31: 34,
    32: 30,
    33: 73,
    34: 54,
    35: 45,
    36: 83,
    37: 182,
    38: 88,
    39: 75,
    40: 85,
    41: 54,
    42: 53,
    43: 89,
    44: 59,
    45: 37,
    46: 35,
    47: 38,
    48: 29,
    49: 18,
    50: 45,
    51: 60,
    52: 49,
    53: 62,
    54: 55,
    55: 78,
    56: 96,
    57: 29,
    58: 22,
    59: 24,
    60: 13,
    61: 14,
    62: 11,
    63: 11,
    64: 18,
    65: 12,
    66: 12,
    67: 30,
    68: 52,
    69: 52,
    70: 44,
    71: 28,
    72: 28,
    73: 20,
    74: 56,
    75: 40,
    76: 31,
    77: 50,
    78: 40,
    79: 46,
    80: 42,
    81: 29,
    82: 19,
    83: 36,
    84: 25,
    85: 22,
    86: 17,
    87: 19,
    88: 26,
    89: 30,
    90: 20,
    91: 15,
    92: 21,
    93: 11,
    94: 8,
    95: 8,
    96: 19,
    97: 5,
    98: 8,
    99: 8,
    100: 11,
    101: 11,
    102: 8,
    103: 3,
    104: 9,
    105: 5,
    106: 4,
    107: 7,
    108: 3,
    109: 6,
    110: 3,
    111: 5,
    112: 4,
    113: 5,
    114: 6
  };

  if (verseRange) {
    if (verseRange.includes('-')) {
      const [_from, _to] = verseRange.split('-').map(num => parseInt(num, 10));

      if (
        isNaN(_from) ||
        isNaN(_to) ||
        _from < 1 ||
        _to > chapterToVersesMap[chapterId]
      ) {
        replaceState('/error/invalid-ayah');
      }
    } else {
      const verseNumber = parseInt(verseRange, 10);

      if (verseNumber > chapterToVersesMap[chapterId]) {
        replaceState('/error/invalid-ayah');
      }
    }
  }
}

export default function checkValidChapterOrVerse(nextState, replaceState) {
  const chapterId = parseInt(nextState.params.chapterId, 10);
  filterValidChapter(replaceState, chapterId);

  if (nextState.params.range) {
    if (nextState.params.range.includes('-')) {
      const [_from, _to] = nextState.params.range.split('-').map(num => num);
      const [from, to] = nextState.params.range
        .split('-')
        .map(num => parseInt(num, 10));

      if (from > to) {
        replaceState(`/${chapterId}/${to}-${from}${nextState.location.search}`);
      } else if (from === to) {
        replaceState(`/${chapterId}/${from}`);
      } else if (
        _from.length !== from.toString().length ||
        _to.length !== to.toString().length
      ) {
        replaceState(`/${chapterId}/${from}-${to}${nextState.location.search}`);
      }
      // TODO: Add check to make sure the range is within the ayah limit
    } else {
      const verseId = parseInt(nextState.params.range, 10);

      if (replaceChapterOrRange(nextState.params)) {
        let location = `${nextState.location.pathname}${nextState.location.search}`;
        location = location.replace(
          /\/([0-9]+)\/([0-9]+)/,
          `/${chapterId}/${verseId}`
        );
        replaceState(location);
      }
    }
  } else if (replaceChapterOrRange(nextState.params)) {
    let location = `${nextState.location.pathname}${nextState.location.search}`;
    location = location.replace(/\/([0-9]+)/, `/${chapterId}`);
    replaceState(location);
  }

  filterValidVerse(replaceState, chapterId, nextState.params.range);
}
