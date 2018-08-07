import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  pageNum: number | string,
};

const PageBreak: React.SFC<Props> = ({ pageNum }: Props) => (
  <div className="row">
    <div className="col-md-12">
      <hr style={{ width: '100%' }} />
      Page {pageNum}
    </div>
  </div>
);

PageBreak.propTypes = {
  pageNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PageBreak;
