import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ChapterShape, VerseShape } from '../../shapes';
import VerseContainer from '../../containers/VerseContainer';

const propTypes = {
  chapter: ChapterShape.isRequired,
  verses: PropTypes.objectOf(VerseShape),
};

const defaultProps = {
  verses: {},
};

type Props = {
  chapter: ChapterShape;
  verses?: { [verseKey: string]: VerseShape };
};

const ListView: React.SFC<Props> = ({ chapter, verses }: Props) => (
  <Fragment>
    {Object.values(verses).map((verse: VerseShape) => (
      <VerseContainer
        verse={verse}
        chapter={chapter}
        key={`${verse.chapterId}-${verse.id}-verse`}
      />
    ))}
  </Fragment>
);

ListView.propTypes = propTypes;
ListView.defaultProps = defaultProps;

export default ListView;
