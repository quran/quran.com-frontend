import React, { PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

const style = require('../style.scss');

const RepeatButton = ({ shouldRepeat, onRepeatToggle }) => {
  const tooltip = (
    <Tooltip id="repeat-button-tooltip">
      Repeats the current ayah on end...
    </Tooltip>
  );

  return (
    <div className="text-center">
      <input type="checkbox" id="repeat" className={style.checkbox} />
      <OverlayTrigger
        overlay={tooltip}
        placement="right"
        trigger={['hover', 'focus']}
      >
        <label
          htmlFor="repeat"
          className={`pointer ${style.buttons} ${shouldRepeat ? style.repeat : ''}`}
          onClick={onRepeatToggle}
        >
          <i className="ss-icon ss-repeat" />
        </label>
      </OverlayTrigger>
    </div>
  );
};

RepeatButton.propTypes = {
  shouldRepeat: PropTypes.bool.isRequired,
  onRepeatToggle: PropTypes.func.isRequired
};

export default RepeatButton;
