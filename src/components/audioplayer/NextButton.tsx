import React from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import ControlButton from './ControlButton';
import { ChapterShape } from '../../shapes';

const propTypes = {
  onNextClick: PropTypes.func.isRequired,
  currentVerseKey: PropTypes.string,
  chapter: ChapterShape.isRequired,
};

const defaultProps = {
  currentVerseKey: '',
};

type Props = {
  onNextClick(): void;
  currentVerseKey: string;
  chapter: ChapterShape;
};

const NextButton: React.SFC<Props> = ({
  onNextClick,
  chapter,
  currentVerseKey,
}: Props) => {
  let isEnd = true;

  if (currentVerseKey) {
    isEnd = chapter.versesCount === toNumber(currentVerseKey.split(':')[1]);
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
