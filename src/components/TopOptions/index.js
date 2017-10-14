import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Share from 'components/Share';
import * as customPropTypes from 'customPropTypes';

const Title = styled.h1`
  color: #000;
  font-size: 18px;
`;

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
  chapter: customPropTypes.surahType.isRequired
};

export default TopOptions;
