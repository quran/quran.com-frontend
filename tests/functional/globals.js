var app;

module.exports = {
  before: function(done) {
    if (process.env.NODE_ENV === 'test') {
      var server = require('../../bin/server');

      if (typeof server == 'function') {
        return server(function(serverScope) {
          app = serverScope;
          done();
        });
      }
    }

    return done();
  },

  after: function(done) {
    if (process.env.NODE_ENV === 'test') {
      // done();
      return app.close(function() {
        done();
      });

      // process.exit(1);
    }

    done();
  }
};
