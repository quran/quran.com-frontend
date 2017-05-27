export const buildTafsirList = (tafsirs, verse) => {
  const verseLink = `/${verse.chapterId}/${verse.verseNumber}`;
  const list = tafsirs.map((tafsir) => {
    const url = `${verseLink}/tafsirs/${tafsir.slug || tafsir.id}`;
    const link = `<a href=${url}>${tafsir.name}</a>`;
    return `<li>${link}</li>`;
  });

  return `<ul>${list}</ul>`;
};
