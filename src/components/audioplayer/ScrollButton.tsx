import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import SwitchToggle from 'quran-components/lib/Toggle';
import T, { KEYS } from '../T';
import ControlButton from './ControlButton';
import Popover from './Popover';

const propTypes = {
  shouldScroll: PropTypes.bool.isRequired,
  onScrollToggle: PropTypes.func.isRequired,
};

type Props = {
  shouldScroll: boolean;
  onScrollToggle: $TsFixMe;
};

const ScrollButton: React.SFC<Props> = ({
  shouldScroll,
  onScrollToggle,
}: Props) => {
  const tooltip = (
    <Popover
      id="scroll-toggle-popoverr"
      title={<T id={KEYS.AUDIOPLAYER_SCROLLBUTTONTIP} />}
    >
      {'  '}
      <SwitchToggle
        checked={shouldScroll}
        onToggle={onScrollToggle}
        id="scroll-toggle"
        name="scroll-toggle"
        flat
      />
    </Popover>
  );

  return (
    <div className="text-center">
      <OverlayTrigger
        overlay={tooltip}
        placement="top"
        trigger="click"
        rootClose
      >
        <ControlButton active={shouldScroll}>
          <i className="ss-icon ss-link" />
        </ControlButton>
      </OverlayTrigger>
    </div>
  );
};

ScrollButton.propTypes = propTypes;

export default ScrollButton;
