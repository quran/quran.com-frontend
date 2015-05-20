import React from 'react';

class Loader extends React.Component {
  render() {
    return (
      <div className="loading" ng-hide="currentSurah.ayahs">
        <div className="row">
          <div className="col-md-5 col-md-offset-2 text-center">
            <i className="fa fa-spinner fa-3x" />
            <h3>Loading...</h3>
          </div>
        </div>
      </div>
    );
  }
}

Loader.displayName = 'Loader';

export default Loader;
