var witm = require('../../webpack-isomorphic-tools-main');
var server = require('../../server');
var app;

module.exports = {
  before: function(done) {
    return witm(function() {
      server(function(serverScope) {
        app = serverScope;
        done();
      })
    });
  },
  after: function(done) {
    done();
    app.close(function() {
      process.exit(0);
    });
  }
};
