import React from 'react';

class InformationToggle extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <a className="nav-link">
        <i className="ss-icon ss-info pull-right"></i>
      </a>
    )
  }
};

export default InformationToggle;
