import React from 'react';

import Title from 'containers/Surah/Title';
import Share from 'components/Share';
import { surahType } from 'types';

const TopOptions = ({ chapter }) => (
  <div className="row">
    <div className="col-md-4 hidden-xs hidden-sm">
      <Title chapter={chapter} />
    </div>
    <div className="col-md-8 text-right">
      <ul className="list-inline">
        <li><Share chapter={chapter} /></li>
      </ul>
    </div>
  </div>
);

TopOptions.propTypes = {
  chapter: surahType.isRequired
};

export default TopOptions;
