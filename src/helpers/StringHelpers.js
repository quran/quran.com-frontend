export function zeroPad(num, places, padChar = '0') { // eslint-disable-line
  const zero = (places - num.toString().length) + 1;

  return Array(+(zero > 0 && zero)).join(padChar) + num;
}
