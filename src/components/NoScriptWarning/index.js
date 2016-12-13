import React from 'react';
import Link from 'react-router/lib/Link';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const styles = require('./style.scss');

const NoScriptWarning = () => (
  <noscript>
    <Row>
      <Col md={12} id={styles.noscript_warning}>
        <p> Looks like either your browser does not support Javascript or its disabled. For a better
          EpicBuzz experience, please enable JavaScript in your browser.
          For more instruction on how to enable javascript'

          <Link to="http://www.enable-javascript.com/">Contact</Link>
        </p>
        </Col>
      </Row>
  </noscript>
  );

export default NoScriptWarning;
