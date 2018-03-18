import React from 'react';
import styled from 'styled-components';

import Status from '../Status';
import LocaleFormattedMessage from '../LocaleFormattedMessage';
import IndexHeader from '../IndexHeader';

const Container = styled.div`
  padding: 20vh 0;
`;

const NotFound = () => (
  <Status code={404}>
    <div>
      <IndexHeader noSearch />
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <Container>
            <h3 className="source-sans">
              <LocaleFormattedMessage
                id="error.not-found"
                defaultMessage="Sorry, this page does not exist"
              />
            </h3>
          </Container>
        </div>
      </div>
    </div>
  </Status>
);

export default NotFound;
