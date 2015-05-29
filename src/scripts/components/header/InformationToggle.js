import React from 'react';

class InformationToggle extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <a className="nav-link">
        <i className="fa fa-info-circle fa-2x pull-right"></i>
      </a>
    )
  }
};

export default InformationToggle;
