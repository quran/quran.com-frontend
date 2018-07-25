import React from 'react';
import styled from 'styled-components';

import RouterStatus from '../RouterStatus';
import T from '../T';
import Jumbotron from '../Jumbotron';

const Container = styled.div`
  padding: 20vh 0;
`;

const NotFound = () => (
  <RouterStatus code={404}>
    <div>
      <Jumbotron noSearch />
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <Container>
            <h3 className="source-sans">
              <T
                id="error.not-found"
                defaultMessage="Sorry, this page does not exist"
              />
            </h3>
          </Container>
        </div>
      </div>
    </div>
  </RouterStatus>
);

export default NotFound;
