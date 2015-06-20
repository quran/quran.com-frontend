import React from 'react';
import classNames from 'classnames';
import * as SurahsActions from 'actions/SurahsActions';

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

    this.context.executeAction(SurahsActions.showInfo);
  }

  render() {
    var classes = classNames({
      active: this.state.toggled,
      'nav-link': true,
      'toggle-icon': true
    });

    return (
      <a className={classes} onClick={this.toggleInformationMode.bind(this)}>
        <i className="ss-icon ss-info" />
      </a>
    )
  }
};

InformationToggle.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

export default InformationToggle;
