import React from 'react';

const loading = require('../../../static/images/loading.gif');
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';


const Loader = () => (
  <div className="loading" nghide="currentSurah.ayahs">
    <div className="row">
      <div className="colmd6 colmdoffset3 textcenter">
        <img src={loading} alt="Loader" />
        <h3>
          <LocaleFormattedMessage id={'app.loading'} defaultMessage={'Loading...'}/>
        </h3>
      </div>
    </div>
  </div>
);

export default Loader;
