import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import T from './T';
import LOCALE_KEYS from '../locale/keys';

import Jumbotron from './Jumbotron';
import { AboutText } from './About';

type Props = {
  match: {
    params: {
      errorKey?:
        | LOCALE_KEYS.ERROR_INVALID_CHAPTER
        | LOCALE_KEYS.ERROR_INVALID_VERSE;
    };
  };
};

const ErrorPage: React.SFC<Props> = ({ match: { params } }: Props) => (
  <div>
    <Helmet title={`Error ${LOCALE_KEYS[params.errorKey]}`} />
    <Jumbotron noSearch />
    <AboutText className="container-fluid about-text">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h4 className="source-sans text-center">
            <T id={LOCALE_KEYS[params.errorKey]} />
          </h4>
        </div>
      </div>
    </AboutText>
  </div>
);

ErrorPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ErrorPage;
