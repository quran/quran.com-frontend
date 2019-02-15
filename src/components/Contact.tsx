import React from 'react';
import { Padding } from 'styled-components-spacing';
import Jumbotron from './Jumbotron';
import Title from './dls/Title';

// TODO: Translations
const Contact: React.SFC = () => (
  <div>
    <Jumbotron noSearch />
    <Padding vertical={3}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <Title level={4} align="center">
              Contacting us - please use the widget on the bottom right corner
              to contact us.
              <br />
              <br />
              Thank you
            </Title>
          </div>
        </div>
      </div>
    </Padding>
  </div>
);

export default Contact;
