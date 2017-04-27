import React from 'react';
import Share from 'components/Share';
import * as customPropTypes from 'customPropTypes';

const TopOptions = ({ chapter }) => (
  <div className="row">
    <div className="col-md-4 hidden-xs hidden-sm">
      {/* NOTE: Caused about 7000 lines of code to accept all titles SVG */}
      {/* <Title chapterNumber={chapter.id} className={styles.title} color={'#2CA4AB'} /> */}
    </div>
    <div className="col-md-8 text-right">
      <ul className="list-inline">
        <li><Share chapter={chapter} /></li>
      </ul>
    </div>
  </div>
);

TopOptions.propTypes = {
  chapter: customPropTypes.surahType.isRequired
};

export default TopOptions;
