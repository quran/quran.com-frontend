export default function getOffset(element) {
  let elem = element;
  let offsetLeft = 0;
  let offsetTop = 0;

  do {
    if (!isNaN(elem.offsetLeft)) {
      offsetLeft += elem.offsetLeft;
      offsetTop += elem.offsetTop;
    }
    elem = elem.offsetParent;
  } while (elem);

  return { left: offsetLeft, top: offsetTop };
}
