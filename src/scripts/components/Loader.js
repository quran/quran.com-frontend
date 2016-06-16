import React from 'react';

const loading = require('../../../static/images/loading.gif');

const Loader = () => (
  <div className="loading" ng-hide="currentSurah.ayahs">
    <div className="row">
      <div className="col-md-6 col-md-offset-3 text-center">
        <img src={loading} />
        <h3>Loading...</h3>
      </div>
    </div>
  </div>
);

export default Loader;
