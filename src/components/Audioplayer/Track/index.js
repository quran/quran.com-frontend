/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  height: 10px;
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
    height: 20px;
    width: 20px;
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

export default class Track extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    onTrackChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

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
        innerRef={(container) => {
          this.container = container;
        }}
        onClick={this.handleClick}
      >
        <Progress style={{ width: `${progress}%` }} />
      </Container>
    );
  }
}
