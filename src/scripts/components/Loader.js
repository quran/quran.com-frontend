import React from 'react';

class Loader extends React.Component {
  render() {
    return (
      <div className="loading" ng-hide="currentSurah.ayahs">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 text-center">
            <img src="//quran-1f14.kxcdn.com/images/loading.gif" />
            <h3>Loading...</h3>
          </div>
        </div>
      </div>
    );
  }
}

Loader.displayName = 'Loader';

export default Loader;
