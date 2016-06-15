import React, { Component } from 'react';
import IndexHeader from '../../components/IndexHeader';
import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';

export default ({params}) => {
  const error = {
    'invalid-surah': 'Surah is out of range',
    'invalid-ayah-range': 'Ayah(s) selected are out of range'
  }
    return (
      <div>
        <Helmet title={`Error ${params.errorTitle}`} />
        <IndexHeader noSearch={true} />
        <div className="container-fluid about-text">
          <div className="row">
              <div className="col-md-8 col-md-offset-2">
                  <h4 className="source-sans">
                    {error[params.errorKey]}. Please go to the <a href="/">home page </a>and select a surah/Ayah
                  </h4>
              </div>
          </div>
        </div>
      </div>
    );
}
