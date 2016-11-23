export default function getOffset(element) {
  let elem       = element, 
      offsetLeft = 0,
      offsetTop  = 0;

  do {
    if (!isNaN(elem.offsetLeft)) {
      offsetLeft += elem.offsetLeft;
      offsetTop += elem.offsetTop;
    }
  } while ((elem = elem.offsetParent));

  return {left: offsetLeft, top: offsetTop};
}
