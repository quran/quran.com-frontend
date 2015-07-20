import React from 'react';
import * as AyahsActions from 'actions/AyahsActions';
import classNames from 'classnames';

class ReadingModeToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      toggled: false
    };
  }

  toggleReadingMode(e) {
    e.preventDefault();

    this.setState({
      toggled: !this.state.toggled
    });

    this.context.executeAction(AyahsActions.toggleReadingMode);
  }

  renderIcon() {
    if (this.props.noPullRight) {
      return <i className="ss-icon ss-openbook" />;
    }
    return <i className="ss-icon ss-openbook" />;
  }

  render() {
    var classes = classNames({
      active: this.state.toggled,
      'nav-link': true,
      'toggle-icon': true
    });

    return (
      <a title="Enter Reading Mode" className={classes} onClick={this.toggleReadingMode.bind(this)}>
        {this.renderIcon()}
      </a>
    );
  }
}

ReadingModeToggle.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

export default ReadingModeToggle;
