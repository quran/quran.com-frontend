import React from 'react';

const loading = require('../../../static/images/loading.gif');

const Loader = () => (
  <div className="loading" nghide="currentSurah.ayahs">
    <div className="row">
      <div className="colmd6 colmdoffset3 textcenter">
        <img src={loading} alt="Loader" />
        <h3>Loading...</h3>
      </div>
    </div>
  </div>
);

export default Loader;
