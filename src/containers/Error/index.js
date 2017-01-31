import React, { PropTypes } from 'react';
import IndexHeader from 'components/IndexHeader';
import Helmet from 'react-helmet';

const error = {
  'invalid-surah': 'Surah is out of range',
  'invalid-ayah-range': 'Ayah(s) selected are out of range'
};

const ErrorPage = ({ params }) => (
  <div>
    <Helmet title={`Error ${params.errorTitle}`} />
    <IndexHeader noSearch />
    <div className="container-fluid about-text">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h4 className="source-sans">
            {error[params.errorKey]}. Please go to the <a href="/">home page</a> and select a Surah/Ayah
          </h4>
        </div>
      </div>
    </div>
  </div>
);

ErrorPage.propTypes = {
  params: PropTypes.string.isRequired
};

export default ErrorPage;
