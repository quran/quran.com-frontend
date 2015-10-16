import debug from 'debug';

export default function(name, namespace) {
  if (namespace) {
    return debug(namespace)(name);
  }
  else {
    return debug('quran')(name);
  }
}
