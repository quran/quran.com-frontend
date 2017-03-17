import React from 'react';
import Title from 'quran-components/lib/SurahTitle';
import Share from 'components/Share';
import { surahType } from 'types';

const styles = require('./style.scss');

const TopOptions = ({ chapter }) => (
  <div className="row">
    <div className="col-md-4 hidden-xs hidden-sm">
      <Title chapterNumber={chapter.id} className={styles.title} color={'#2CA4AB'} />
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
