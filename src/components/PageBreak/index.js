import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const PageBreak = ({ pageNum }) => (
  <Row>
    <Col md={12}>
      <hr style={{ width: '100%' }} />
      Page {pageNum}
    </Col>
  </Row>
);

PageBreak.propTypes = {
  pageNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PageBreak;
