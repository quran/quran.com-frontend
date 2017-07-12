export default (verses, initial) => {
  const lines = initial || {};

  verses.forEach((currentVerse) => {
    currentVerse.words.forEach((word) => {
      if (lines[`${word.pageNumber}-${word.lineNumber}`]) {
        const isInArray = lines[
          `${word.pageNumber}-${word.lineNumber}`
        ].find((item) => {
          const itemChecksum = `${item.lineNumber}${item.code}${item.verseKey}${item.position}`;
          const dataChecksum = `${word.lineNumber}${word.code}${word.verseKey}${item.position}`;

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

  return lines;
};
