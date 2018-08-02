import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'quran-components/lib/Loader';
import ControlButton from './ControlButton';

const loaderStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '32px',
  height: '32px',
  margin: '-8px',
  background: '#ffffff',
};

const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  currentVerse: PropTypes.string,
};

type Props = {
  isPlaying: boolean;
  onPause(): void;
  onPlay(): void;
  currentVerse?: string;
};

const PlayStopButton: React.SFC<Props> = ({
  isPlaying,
  onPause,
  onPlay,
  currentVerse,
}: Props) => {
  const icon = (
    <i className={`ss-icon ${isPlaying ? 'ss-pause' : 'ss-play'}`} />
  );

  const loader = <Loader isActive relative style={loaderStyle} />;

  return (
    <ControlButton
      className="pointer text-center"
      onClick={isPlaying ? onPause : onPlay}
      playingButton
    >
      {currentVerse ? icon : loader}
    </ControlButton>
  );
};

PlayStopButton.propTypes = propTypes;

export default PlayStopButton;
