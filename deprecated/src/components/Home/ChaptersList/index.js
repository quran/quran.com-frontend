import React from 'react';
import PropTypes from 'prop-types';
import { chapterType } from 'customPropTypes';

import ChapterItem from 'components/Home/ChapterItem';
import List from 'components/List';

const ChaptersList = ({ chapters }) => (
  <List className="col-md-4">
    {chapters.map(chapter => (
      <ChapterItem key={chapter.id} chapter={chapter} />
    ))}
  </List>
);

ChaptersList.propTypes = {
  chapters: PropTypes.arrayOf(chapterType).isRequired,
};

export default ChaptersList;
