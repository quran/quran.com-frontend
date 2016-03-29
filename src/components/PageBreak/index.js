import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const PageBreak = ({ pageNum }) => (
  <Row>
    <Col md={12}>
      <hr style={{width: '100%'}} />
      Page {parseInt(pageNum, 10) + 1}
    </Col>
  </Row>
);

export default PageBreak;
