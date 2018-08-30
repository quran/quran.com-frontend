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
  currentVerseKey: PropTypes.string,
};

const defaultProps = {
  currentVerseKey: '',
};

type Props = {
  isPlaying: boolean;
  onPause(): void;
  onPlay(): void;
  currentVerseKey?: string;
};

const PlayStopButton: React.SFC<Props> = ({
  isPlaying,
  onPause,
  onPlay,
  currentVerseKey,
}: Props) => {
  const icon = (
    <i className={`ss-icon ${isPlaying ? 'ss-pause' : 'ss-play'}`} />
  );

  const loader = <Loader isActive relative style={loaderStyle} />;

  return (
    <ControlButton
      onClick={isPlaying ? onPause : onPlay}
      playingButton
    >
      {currentVerseKey ? icon : loader}
    </ControlButton>
  );
};

PlayStopButton.propTypes = propTypes;
PlayStopButton.defaultProps = defaultProps;

export default PlayStopButton;
