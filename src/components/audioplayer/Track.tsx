import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  height: ${({ theme }) => `${theme.unit}px`};
  width: 100%;
  background-color: #f7f7f7;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.brandPrimary};
  position: relative;
  padding-left: 12px;

  &:after {
    content: '';
    height: ${({ theme }) => `${theme.unit * 2}px`};
    width: ${({ theme }) => `${theme.unit * 2}px`};
    border-radius: 10px;
    position: absolute;
    right: -3px;
    display: block;
    background: #fff;
    top: -5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
    transition: opacity 0.1s ease-in-out;
  }
`;

const propTypes = {
  progress: PropTypes.number.isRequired,
  onTrackChange: PropTypes.func.isRequired,
};

type Props = {
  progress: number;
  onTrackChange: $TsFixMe;
};

class Track extends Component<Props> {
  public static propTypes = propTypes;

  public container: $TsFixMe = null;

  setContainerRef = (container: $TsFixMe) => {
    this.container = container;
  };

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onTrackChange } = this.props;

    const fraction =
      event.nativeEvent.offsetX / this.container.getBoundingClientRect().width;

    return onTrackChange(fraction);
  };

  render() {
    const { progress } = this.props;

    return (
      <Container innerRef={this.setContainerRef} onClick={this.handleClick}>
        <Progress style={{ width: `${progress}%` }} />
      </Container>
    );
  }
}

export default Track;
