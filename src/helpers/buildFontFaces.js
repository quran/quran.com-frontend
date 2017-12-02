/* eslint-disable max-len */

var assetHost = process.env.ASSET_HOST;

export const fontFaceStyle = fontClassName => (
  `@font-face {font-family: '${fontClassName}';
  src: url('//${assetHost}/fonts/compressed/eot/${fontClassName}.eot?#iefix') format('embedded-opentype'),
  url('//${assetHost}/fonts/ttf/${fontClassName}.ttf') format('truetype'),
  url('//${assetHost}/fonts/woff/${fontClassName}.woff?-snx2rh') format('woff');}
  .${fontClassName} {font-family: '${fontClassName}';}
  .${fontClassName} {display: none;}`
);

export const fontFaceStyleLoaded = fontClassName => (
  `.${fontClassName} {display: block;}
  .text-${fontClassName} {display: none;}`
);

export function createFontFacesArray(verses) {
  const fontFaces = [];
  const fontFacesArray = [];

  verses.forEach((ayah) => {
    const font = ayah.words[0].className;

    if (fontFaces.indexOf(font) === -1) {
      fontFaces.push(font);
      fontFacesArray.push(
        `@font-face {font-family: '${font}';
        src: url('//${assetHost}/fonts/compressed/eot/${font}.eot?#iefix') format('embedded-opentype'),
        url('//${assetHost}/fonts/ttf/${font}.ttf') format('truetype'),
        url('//${assetHost}/fonts/woff/${font}.woff?-snx2rh') format('woff');}
        .${font} {font-family: '${font}';}`
      );
    }
  });

  return fontFacesArray;
}
