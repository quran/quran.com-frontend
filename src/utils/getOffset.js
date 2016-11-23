export default function getOffset(elem) {
  let offsetLeft = 0, offsetTop = 0;

  do {
    if (!isNaN( elem.offsetLeft ))
    {
      offsetLeft += elem.offsetLeft;
      offsetTop += elem.offsetTop;
    }
  } while (elem = elem.offsetParent);

  return {left: offsetLeft, top: offsetTop};
}
