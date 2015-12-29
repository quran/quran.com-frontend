import debug from 'debug';

export default function(namespace, message) {
  if (arguments.length === 2) {
    return debug(`quran:${namespace}`)(message);
  }

  return debug('quran')(arguments[0]);
}
