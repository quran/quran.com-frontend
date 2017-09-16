/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 6px;
  width: 100%;
  background-color: #f7f7f7;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${props => props.theme.brandPrimary};
  position: relative;
  padding-left: 12px;

  &:after {
    content: '';
    height: 12px;
    width: 12px;
    border-radius: 10px;
    position: absolute;
    right: 0;
    display: block;
    background: #fff;
    top: -3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
    transition: height 0.5s;
  }
`;

export default class Track extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    onTrackChange: PropTypes.func.isRequired
  };

  handleClick = (event) => {
    const { onTrackChange } = this.props;

    const fraction =
      event.nativeEvent.offsetX / this.container.getBoundingClientRect().width;

    return onTrackChange(fraction);
  };

  render() {
    const { progress } = this.props;

    return (
      <Container
        ref={(container) => {
          this.container = container;
        }}
        onClick={this.handleClick}
      >
        <Progress style={{ width: `${progress}%` }} />
      </Container>
    );
  }
}
