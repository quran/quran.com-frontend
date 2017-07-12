import React from 'react';
import PropTypes from 'prop-types';
import Share from 'components/Share';
import * as customPropTypes from 'customPropTypes';

import Title from '../dls/Title';

const TopOptions = ({ title, chapter }) => (
  <div className="row">
    <div className="col-md-4 hidden-xs hidden-sm">
      {title && <Title>{title}</Title>}
    </div>
    <div className="col-md-8 text-right">
      <ul className="list-inline">
        <li>
          <Share chapter={chapter} />
        </li>
      </ul>
    </div>
  </div>
);

TopOptions.propTypes = {
  title: PropTypes.string,
  chapter: customPropTypes.chapterType.isRequired
};

export default TopOptions;
