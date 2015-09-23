var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

export default request;
