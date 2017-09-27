import React, { PropTypes } from 'react';

const PageBreak = ({ pageNum }) => (
  <div className="row">
    <div className="col-md-12">
      <hr style={{ width: '100%' }} />
      Page {pageNum}
    </div>
  </div>
);

PageBreak.propTypes = {
  pageNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PageBreak;
