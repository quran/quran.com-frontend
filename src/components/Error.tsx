import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Padding } from 'styled-components-spacing';
import T from './T';
import LOCALE_KEYS from '../locale/keys';

import Jumbotron from './Jumbotron';
import Title from './dls/Title';

type Props = {
  match: {
    params: {
      errorKey: 'ERROR_INVALID_CHAPTER' | 'ERROR_INVALID_VERSE';
    };
  };
};

const ErrorPage: React.SFC<Props> = ({ match: { params } }: Props) => (
  <div>
    <Helmet title={`Error ${LOCALE_KEYS[params.errorKey]}`} />
    <Jumbotron noSearch />
    <Padding vertical={3}>
      <div className="container-fluid about-text">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <Title level={4} align="center">
              <T id={LOCALE_KEYS[params.errorKey]} />
            </Title>
          </div>
        </div>
      </div>
    </Padding>
  </div>
);

ErrorPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ErrorPage;
