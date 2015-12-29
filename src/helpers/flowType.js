/* eslint-disable no-nested-ternary */
const settings = {
  maximum: 1680,
  minimum: 400,
  maxFont: 70,
  minFont: 20,
  fontRatio: 10
};

export function getFontSize() {
  const propDiff = window.innerWidth / settings.maximum;
  const fontBase = (propDiff * settings.maxFont);
  const fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;

  return fontSize;
}

export default function(componentDOM) {
  const lineElem = componentDOM.querySelector('.line');

  const calculateChange = (elem) => {
    if (!elem.getAttribute('fontSizeChanged')) {
      elem.style.fontSize = getFontSize() + 'px';
    }
  };

  window.addEventListener('resize', () => calculateChange(lineElem), true);

  calculateChange(lineElem);
}
