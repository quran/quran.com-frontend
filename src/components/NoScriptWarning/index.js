import React from 'react';
import Link from 'react-router/lib/Link';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const styles = require('./style.scss');

const NoScriptWarning = () => (
  <noscript>
    <Row>
      <Col md={12} id={styles.noscript_warning}>
        <p> Looks like either your browser does not support Javascript or its disabled. Quran.com workes best with JavaScript enabled.
          For more instruction on how to enable javascript

          <Link to="http://www.enable-javascript.com/">Click here</Link>
        </p>
        </Col>
      </Row>
  </noscript>
  );

export default NoScriptWarning;
