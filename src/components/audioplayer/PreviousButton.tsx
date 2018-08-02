import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from './ControlButton';

const propTypes = {
  onPreviousClick: PropTypes.func.isRequired,
  currentVerse: PropTypes.string.isRequired,
  files: PropTypes.object.isRequired,
};

type Props = {
  onPreviousClick(): void;
  currentVerse: string;
  files: { [key: string]: HTMLAudioElement };
};

const PreviousButton: React.SFC<Props> = ({
  onPreviousClick,
  files,
  currentVerse,
}: Props) => {
  const index = Object.keys(files).findIndex(id => id === currentVerse);

  return (
    <ControlButton
      tabIndex="-1"
      className="pointer"
      onClick={() => index && onPreviousClick()}
      disabled={!index}
    >
      <i className="ss-icon ss-skipback" />
    </ControlButton>
  );
};

PreviousButton.propTypes = propTypes;

export default PreviousButton;
