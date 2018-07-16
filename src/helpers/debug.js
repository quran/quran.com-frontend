import debug from 'debug';

export default (...args) => {
  if (args.length === 2) {
    return debug(`quran:${args[0]}`)(args[1]);
  }

  return debug('quran')(args[0]);
};
