import React from 'react';
import Col from 'react-bootstrap/lib/Col';

import Title from 'containers/Surah/Title';
import Share from 'components/Share';
import { surahType } from 'types';

const TopOptions = ({ surah }) => (
  <div className="row">
    <Col md={4} className="hidden-xs hidden-sm">
      <Title surah={surah} />
    </Col>
    <Col md={8} className="text-right">
      <ul className="list-inline">
        <li><Share surah={surah} /></li>
      </ul>
    </Col>
  </div>
);

TopOptions.propTypes = {
  surah: surahType.isRequired
};

export default TopOptions;
