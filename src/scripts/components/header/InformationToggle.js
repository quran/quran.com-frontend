import React from 'react';
import classNames from 'classnames';

class InformationToggle extends React.Component {
  constructor(props) {
    super();

    this.state = {
      toggled: false
    };
  }

  toggleInformationMode(e) {
    e.preventDefault();

    this.setState({
        toggled: !this.state.toggled
    });

    // this.context.executeAction(AyahsActions.toggleReadingMode)
  }

  render() {
    var classes = classNames({
      active: this.state.toggled,
      'nav-link': true,
      'toggle-icon': true
    });

    return (
      <a className={classes}>
        <i className="ss-icon ss-info" />
      </a>
    )
  }
};

export default InformationToggle;
