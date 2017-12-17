import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedHTMLMessage } from 'react-intl';

import IndexHeader from 'components/IndexHeader';
import AboutText from 'components/AboutText';

const error = {
  'invalid-surah':
    "Surah is out of range. Please go to <a href='/'> home page</a> and select a Surah",
  'invalid-ayah':
    "Ayah is out of range. Please go to <a href='/'> home page </a> and select a Surah/Ayah"
};

const ErrorPage = ({ match: { params } }) =>
  <div>
    <Helmet title={`Error ${error[params.errorKey]}`} />
    <IndexHeader noSearch />
    <AboutText className="container-fluid about-text">
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
    </AboutText>
  </div>;

ErrorPage.propTypes = {
  match: PropTypes.object.isRequired // eslint-disable-line
};

export default ErrorPage;
