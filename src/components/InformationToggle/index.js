import React, { Component } from 'react';

export default class InformationToggle extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      toggled: false
    };
  }

  toggleInformationMode(e) {
    e.preventDefault();
    this.setState({ toggled: !this.state.toggled });
    this.props.onClick();
  }

  render() {
    return (
      <div className={this.props.className} style={{padding: 0, textAlign: 'center', height: '40px'}}>
        <a title="See information for this surah"
          className={`nav-link toggle-icon${this.state.toggled? ' active' : ''}`}
          onClick={this.toggleInformationMode.bind(this)}>
          <i className="ss-icon ss-info" />
        </a>
      </div>
    );
  }
}

