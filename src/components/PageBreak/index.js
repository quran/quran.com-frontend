import React, { PropTypes } from 'react';
import Col from 'react-bootstrap/lib/Col';

const PageBreak = ({ pageNum }) => (
  <div className="row">
    <Col md={12}>
      <hr style={{ width: '100%' }} />
      Page {pageNum}
    </Col>
  </div>
);

PageBreak.propTypes = {
  pageNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PageBreak;
