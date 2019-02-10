const execIfFunc = (x?: functionOrNull | boolean | string) =>
  typeof x === 'function' ? x() : x;

type aFunction = () => void;
type functionOrNull =
  | string
  | null
  | aFunction
  | { [key: string]: $TsFixMe }
  | boolean;
/**
 * This is a higher order function that accepts a boolean condition and will
 * return a function allowing you to provide if/else values that should be
 * resolved based on the boolean condition.
 *
 * @param  {Boolean|() => Boolean} condition:
 *   The condition to test against. This can be a function for lazy resolution.
 *
 * @return {(X|() => X, Y|() => Y) => X|Y}
 *   A function where the first paramater is the "if" and the second paramater
 *   is the "else".  Each of these allows lazy resolving by providing a function.
 *
 * @example
 *   const ifDev = ifElse(process.env.NODE_ENV === 'development');
 *   ifDev('foo', () => 'lazy resolved');  // => 'foo'
 */
export default function ifElse(condition: boolean) {
  // eslint-disable-next-line
  return (then?: functionOrNull, or?: functionOrNull) =>
    execIfFunc(condition) ? execIfFunc(then) : execIfFunc(or);
}
