'use strict';


export function createFontFaces(ayahs) {
  var fontFaces = [];
  return ayahs.map(function(ayah) {
    let font = ayah.quran[0].char.font;

    if (fontFaces.indexOf(font) === -1) {
      fontFaces.push(font);
      return this.fontFace(font);
    }
  }.bind(this));
}

export function fontFace(className) {
  var style;
  style = document.createElement('style');
  style.type = 'text/css';

  style.appendChild(
      document.createTextNode(
          "@font-face {font-family: '" +
          className +
          "';src: url('/fonts/compressed/eot/" +
          className +
          ".eot?#iefix') format('embedded-opentype'),url('/fonts/woff/" +
          className +
          ".woff?-snx2rh') format('woff'),url('/fonts/ttf/" +
          className +
          ".ttf') format('truetype'),url('/fonts/compressed/svg/" +
          className +
          ".svg#') format('svg');}." +
          className + "{font-family: '" +
          className +
          "';}"
      )
  );
  return document.head.appendChild(style);
}
