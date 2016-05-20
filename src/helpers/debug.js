import __debug from 'debug';

export function error(namespace, args) {
  try {
    const _error = __debug(`quran:${namespace}`);
    _error.log = (args) => {
      args = [...(typeof(args) === 'string' ? [args] : args)];
      console.error ? console.error(`quran:${namespace}`, ...args) : console.warn(`quran:${namespace}`, ...args);
    };
    return typeof(args) === 'undefined' ? _error : _error(...(typeof(args) === 'string' ? [args] : args));
  } catch(e) {
    console.warn('error failed', namespace, args, e);
  }
};

export default function debug(namespace, args) {
  try {
    const _debug = __debug(`quran:${namespace}`);
    _debug.log = (args) => {
      args = [...(typeof(args) === 'string' ? [args] : args)];
      if (__CLIENT__) args.unshift(`quran:${namespace}`);
      console.debug ? console.debug(...args) : console.log(...args);
    };
    return typeof(args) === 'undefined' ? _debug : _debug(...(typeof(args) === 'string' ? [args] : args));
  } catch(e) {
    console.warn('debug failed', namespace, args, e);
  }
}
