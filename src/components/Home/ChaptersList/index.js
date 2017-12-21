import React from 'react';
import * as customPropTypes from 'customPropTypes';

import ChapterItem from 'components/Home/ChapterItem';
import List from 'components/List';

const ChaptersList = ({ chapters }) =>
  <List className="col-md-4">
    {chapters.map(chapter => <ChapterItem chapter={chapter} />)}
  </List>;

ChaptersList.propTypes = {
  chapters: customPropTypes.chapters.isRequired
};

export default ChaptersList;
