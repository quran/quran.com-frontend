// eslint-disable-next-line
export const zeroPad = (
  num: string,
  places: number,
  padChar = '0' as string
) => {
  const zero = places - num.toString().length + 1;

  return Array(Number(zero > 0 && zero)).join(padChar) + num;
};
