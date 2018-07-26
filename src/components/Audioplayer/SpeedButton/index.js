import React from "react"
import styled from "styled-components"

import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { ControlButton, StyledPopover } from '../index';

const SpeedList = styled.ul`
  list-style-type: none;
  padding: 0;
  li {
    text-align: center;
    padding: 5px 0;
    transition: 0.25s;
    cursor: pointer;
    &:hover {
      background: #c9f1d6;
      box-shadow: 15px 0 #c9f1d6, -15px 0 #c9f1d6;
    }
    &.active {
      background: #c9f1d6;
      color: ${props => props.theme.brandPrimary};
      box-shadow: 15px 0 #c9f1d6, -15px 0 #c9f1d6;
    }
  }
`

class SpeedButton extends React.Component {
  state = {
    speedsList: ["0.25", "0.5", "0.75", "1.", "1.25", "1.5", "2" ],
  }
  handleChange = (index) => {
    this.tooltip.handleHide()
    this.props.onChange(this.state.speedsList[index])
  }
  render() {
    const { currentSpeed } = this.props

    return (
      <div className="text-center">
        <OverlayTrigger
          overlay={
            <StyledPopover
              id="scroll-toggle-popoverr"
              title={
                <LocaleFormattedMessage
                  id="player.speedButtonTip"
                  defaultMessage="speed"
                />
              }
            >
              <SpeedList>
                {
                  this.state.speedsList.map((speed, i) => {
                    const isActive = speed === this.props.currentSpeed
                    return (
                      <li key={i} className={isActive ? "active" : ""} onClick={() => this.handleChange(i)}>
                        { speed }
                      </li>
                    )
                  })
                }
              </SpeedList>
            </StyledPopover>
          }
          ref={C => this.tooltip = C}
          placement="top"
          trigger="click"
          rootClose
        >
          <ControlButton active={ currentSpeed !== "1." } style={{ lineHeight: 2 }}>
            <span>{ currentSpeed }x</span>
          </ControlButton>
        </OverlayTrigger>
      </div>
    );
  }
}


export default SpeedButton
