export const zeroPad = (num: string, places: number, padChar = ('0' as string)) => {
  const zero = places - num.toString().length + 1;

  return Array(+(zero > 0 && zero)).join(padChar) + num;
};
