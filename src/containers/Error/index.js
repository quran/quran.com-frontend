import React from 'react';
import PropTypes from 'prop-types';
import IndexHeader from 'components/IndexHeader';
import Helmet from 'react-helmet';
import { FormattedHTMLMessage } from 'react-intl';

const error = {
  'invalid-surah': "Surah is out of range. Please go to <a href='/'> home page</a> and select a Surah",
  'invalid-ayah': "Ayah is out of range. Please go to <a href='/'> home page </a> and select a Surah/Ayah"
};

const ErrorPage = ({ params }) => (
  <div>
    <Helmet title={`Error ${error[params.errorKey]}`} />
    <IndexHeader noSearch />
    <div className="container-fluid about-text">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h4 className="source-sans text-center">
            <FormattedHTMLMessage
              id={`error.${params.errorKey}`}
              defaultMessage={error[params.errorKey]}
            />
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
