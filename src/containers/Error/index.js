import React, { Component } from 'react';
import IndexHeader from '../../components/IndexHeader';
import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';

export default ({params}) => {
    console.log(params, 'params?');
    return (
      <div>
        <Helmet title={`Error ${params.errorTitle}`} />
        <IndexHeader noSearch={true} />
        <div className="container-fluid about-text">
          <div className="row">
              <div className="col-md-8 col-md-offset-2">
                  <h4 className="source-sans">
                    {params.errorTitle} is an invalid Surah/Ayah. Please go to the <a href="/">home page </a>and select a surah
                  </h4>
              </div>
          </div>
        </div>
      </div>
    );
}
