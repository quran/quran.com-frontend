import React from 'react';

import IndexHeader from 'components/IndexHeader';
import AboutText from 'components/AboutText';

const Contact = () => (
  <div>
    <IndexHeader noSearch />
    <AboutText className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>
            Contacting us - please use the widget on the bottom right corner to
            contact us.
            <br />
            <br />
            Thank you
          </h4>
        </div>
      </div>
    </AboutText>
  </div>
);

export default Contact;
