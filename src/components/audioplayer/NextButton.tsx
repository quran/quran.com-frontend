import React from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import ControlButton from './ControlButton';
import { ChapterShape } from '../../shapes';

const propTypes = {
  onNextClick: PropTypes.func.isRequired,
  currentVerse: PropTypes.string,
  chapter: ChapterShape.isRequired,
};

const defaultProps = {
  currentVerse: '',
};

type Props = {
  onNextClick(): void;
  currentVerse: string;
  chapter: ChapterShape;
};

const NextButton: React.SFC<Props> = ({
  onNextClick,
  chapter,
  currentVerse,
}: Props) => {
  let isEnd = true;

  if (currentVerse) {
    isEnd = chapter.versesCount === toNumber(currentVerse.split(':')[1]);
  }

  return (
    <ControlButton
      className="pointer"
      onClick={() => !isEnd && onNextClick()}
      disabled={isEnd}
    >
      <i className="ss-icon ss-skipforward" />
    </ControlButton>
  );
};

NextButton.propTypes = propTypes;
NextButton.defaultProps = defaultProps;

export default NextButton;
