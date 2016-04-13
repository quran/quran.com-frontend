import React, { Component } from 'react';

export default class InformationToggle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isShowingInfo !== this.props.isShowingInfo) {
      return true;
    }
    console.log('this.props', this.props);
    return false;
  }


  toggleInformationMode(e) {
    e.preventDefault();
    console.log('toggleInformationMode', this.props.isShowingInfo);
    this.props.onClick();
  }

  render() {
    return (
      <a title="See information for this surah"
        className={`nav-link toggle-icon${this.props.isShowingInfo? ' active' : ''}`}
        onClick={this.toggleInformationMode.bind(this)}>
        <i className="ss-icon ss-info" />
      </a>
    );
  }
}

