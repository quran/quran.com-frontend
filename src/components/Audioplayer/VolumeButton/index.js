import React from "react"
import styled from "styled-components"

import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { ControlButton, StyledPopover } from '../index';

const Slider = styled.div`
  display: inline-block;
  width: 5px;
  height: 150px;
  padding: 0;

  input[type='range'] {
    width: 150px;
    height: 5px;
    margin: 0;
    transform-origin: 75px 75px;
    transform: rotate(-90deg);
    -webkit-appearance: none;
    background-image: ${ props => `-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, ${ props.theme.brandPrimary }), color-stop(100%, ${ props.theme.brandPrimary }))`};
    background-size: ${ props => props.currentVolume * 100 + "%"} 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    cursor: pointer;
    &:focus {
    outline: none;
    }
    &::-webkit-slider-thumb {
      width: 16px;
      height: 16px;
      border: 0;
      background: white;
      border-radius: 100%;
      box-shadow: 0 1px 2px 0px #000;
      -webkit-appearance: none;
    } 
    &::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border: 0;
      background: white;
      border-radius: 100%;
      box-shadow: 0 1px 2px 0px #000; 
    }
    &::-webkit-slider-runnable-track {
      box-shadow: none;
      border: none;
      background: transparent;
      -webkit-appearance: none; 
    }
    &::-moz-range-track {
      box-shadow: none;
      border: none;
      background: transparent; 
    }
    &::-moz-focus-outer {
      border: 0; 
    }

  }
`

class VolumeButton extends React.Component {
  handleChange = (e) => {
    const volume = e.target.value
    let min = e.target.min,
      max = e.target.max,
      val = e.target.value;

    e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

    this.props.onChange(volume)
  }
  render() {
    const { currentVolume } = this.props
    const volumeIcon = currentVolume > 0.5 ? "ss-volumehigh" : currentVolume > 0 ? "ss-volumelow" : "ss-volume"

    return (
      <div className="text-center">
        <OverlayTrigger
          overlay={
            <StyledPopover
              id="scroll-toggle-popoverr"
              title={
                <LocaleFormattedMessage
                  id="player.volumeButtonTip"
                  defaultMessage="volume"
                />
              }
            >
              <Slider currentVolume={parseFloat(currentVolume)}>
                <input type="range" onInput={this.handleChange} min={0} max={1} step={0.05} defaultValue={currentVolume} />
              </Slider>
            </StyledPopover>
          }
          ref={C => this.tooltip = C}
          placement="top"
          trigger="click"
          rootClose
        >
          <ControlButton >
            <i className={"ss-icon " + volumeIcon} />
          </ControlButton>
        </OverlayTrigger>
      </div>
    );
  }
}


export default VolumeButton
