import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ChapterShape, VerseShape } from '../../shapes';
import VerseContainer from '../../containers/VerseContainer';

const propTypes = {
  chapter: ChapterShape.isRequired,
  isLoading: PropTypes.bool.isRequired,
  verses: PropTypes.objectOf(VerseShape),
};

const defaultProps = {
  verses: {},
};

type Props = {
  chapter: ChapterShape;
  verses?: { [verseKey: string]: VerseShape };
  isLoading: boolean;
};

const ListView: React.SFC<Props> = ({ chapter, verses, isLoading }: Props) => (
  <Fragment>
    {!isLoading &&
      Object.values(verses).map((verse: VerseShape) => (
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
