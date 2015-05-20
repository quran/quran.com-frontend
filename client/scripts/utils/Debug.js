import debug from 'debug';
let bugger;

export default function(name, namespace) {
  if (namespace) {
    console.log(namespace)
    bugger = debug(namespace);
  }
  else {
    bugger = debug('quran-com');
  }
  return bugger(name);
};
