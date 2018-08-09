import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from './ControlButton';

const propTypes = {
  onPreviousClick: PropTypes.func.isRequired,
  currentVerseKey: PropTypes.string,
  files: PropTypes.object.isRequired,
};

const defaultProps = {
  currentVerseKey: '',
};

type Props = {
  onPreviousClick(): void;
  currentVerseKey: string;
  files: { [key: string]: HTMLAudioElement };
};

const PreviousButton: React.SFC<Props> = ({
  onPreviousClick,
  files,
  currentVerseKey,
}: Props) => {
  const index = Object.keys(files).findIndex(id => id === currentVerseKey);

  return (
    <ControlButton
      className="pointer"
      onClick={() => index && onPreviousClick()}
      disabled={!index}
    >
      <i className="ss-icon ss-skipback" />
    </ControlButton>
  );
};

PreviousButton.propTypes = propTypes;
PreviousButton.defaultProps = defaultProps;

export default PreviousButton;
