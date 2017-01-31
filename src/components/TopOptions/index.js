import React from 'react';

import Title from 'containers/Surah/Title';
import Share from 'components/Share';
import { surahType } from 'types';

const TopOptions = ({ surah }) => (
  <div className="row">
    <div className="col-md-4 hidden-xs hidden-sm">
      <Title surah={surah} />
    </div>
    <div className="col-md-8 text-right">
      <ul className="list-inline">
        <li><Share surah={surah} /></li>
      </ul>
    </div>
  </div>
);

TopOptions.propTypes = {
  surah: surahType.isRequired
};

export default TopOptions;
