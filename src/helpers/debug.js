import __debug from 'debug';
export default function debug(namespace, args) {
  try {
    const _debug = __debug(`quran:${namespace}`);
    _debug.log = (args) => {
      args = [...(typeof(args) === 'string' ? [args] : args)];
      if (__CLIENT__) args.unshift(`quran:${namespace}`);
      console.debug ? console.debug(...args) : console.log(...args);
    };
    _debug.err = (errs) => {
      errs = [...(typeof(errs) === 'string' ? [errs] : errs)];
      if (__CLIENT__) errs.unshift(`quran:${namespace}`);
      console.error ? console.error(...errs) : console.warn(...errs);
    };
    return typeof(args) === 'undefined' ? _debug : _debug(...(typeof(args) === 'string' ? [args] : args));
  } catch(e) {
    console.warn('debug failed', namespace, args, e);
  }
}
