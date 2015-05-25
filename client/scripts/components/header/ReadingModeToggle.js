import React from 'react';
import * as AyahsActions from 'actions/AyahsActions';


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

    this.context.executeAction(AyahsActions.toggleReadingMode)
  }

  renderIcon() {
    if (this.props.noPullRight) {
      return <i className="fa fa-newspaper-o fa-2x"></i>;
    }
    return <i className="fa fa-newspaper-o fa-2x pull-right"></i>;
  }

  render() {
    var classes = React.addons.classSet({
      selected: this.state.toggled,
      'nav-link': true
    });

    return (
      <a href className={classes} onClick={this.toggleReadingMode.bind(this)}>
        {this.renderIcon()}
      </a>
    );
  }
}

ReadingModeToggle.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

export default ReadingModeToggle;
