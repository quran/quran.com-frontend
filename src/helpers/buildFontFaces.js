/* eslint-disable max-len */

export function createFontFacesArray(ayahs) {
  const fontFaces = [];
  const fontFacesArray = [];

  ayahs.forEach(ayah => {
    const font = ayah.words[0].className;

    if (fontFaces.indexOf(font) === -1) {
      fontFaces.push(font);
      fontFacesArray.push(
        `@font-face {font-family: '${font}';
        src: url('//quran-1f14.kxcdn.com/fonts/compressed/eot/${font}.eot?#iefix') format('embedded-opentype'),
        url('//quran-1f14.kxcdn.com/fonts/ttf/${font}.ttf') format('truetype'),
        url('//quran-1f14.kxcdn.com/fonts/woff/${font}.woff?-snx2rh') format('woff'),
        url('//quran-1f14.kxcdn.com/fonts/compressed/svg/${font}.svg#') format('svg');}
        .${font} {font-family: '${font}';}`
      );
    }
  });

  return fontFacesArray;
}
