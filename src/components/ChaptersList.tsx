import React from 'react';
import PropTypes from 'prop-types';
import ChapterLink from './ChapterLink';
import { ChapterShape } from '../shapes';
import List from './List';

type Props = {
  chapters: Array<ChapterShape>;
};

const ChaptersList: React.SFC<Props> = ({ chapters }: Props) => (
  <List className="col-md-4">
    {chapters.map(chapter => (
      <ChapterLink key={chapter.id} chapter={chapter} />
    ))}
  </List>
);

ChaptersList.propTypes = {
  chapters: PropTypes.arrayOf(ChapterShape).isRequired,
};

export default ChaptersList;
