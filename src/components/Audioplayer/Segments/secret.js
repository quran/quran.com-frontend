export default (function() {
  var secret;
  try {
    secret = require('../../../../.shh/audio-segments.secret.js');
  } catch(e) {
    secret = 'too-bad... :(';
  }
  return secret;
}());
