/* global window */
import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

type Props = {
  isEnd: boolean;
  isLoading: boolean;
  onLazyLoad(): void;
  loadingComponent: ReactNode;
  endComponent: ReactNode;
};

class LazyLoad extends Component<Props> {
  public static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    onLazyLoad: PropTypes.func.isRequired,
    loadingComponent: PropTypes.element,
    endComponent: PropTypes.element,
  };

  public static defaultProps = {
    loadingComponent: 'Loading...',
    endComponent: 'End.',
  };

  handleWaypointEnter = () => {
    const { isLoading, isEnd, onLazyLoad } = this.props;

    if (!isLoading && !isEnd) {
      return onLazyLoad();
    }

    return false;
  };

  render() {
    const { isEnd, isLoading, loadingComponent, endComponent } = this.props;

    if (isEnd) {
      return endComponent;
    }

    if (isLoading) {
      return loadingComponent;
    }

    return (
      <Waypoint onEnter={this.handleWaypointEnter}>
        <div />
      </Waypoint>
    );
  }
}

export default LazyLoad;
