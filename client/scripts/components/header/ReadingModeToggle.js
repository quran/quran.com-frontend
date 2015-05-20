import React from 'react';
// import AyahListActions from 'actions/AyahListActions';


class ReadingModeToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false
    };
  }

  readingMode(e) {
    e.preventDefault();

    this.setState({
        toggled: !this.state.toggled
    });

    // AyahListActions.toggleReadingMode(this.context.dispatcher);
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
      <a href className={classes} onClick={this.readingMode}>
        {this.renderIcon()}
      </a>
    );
  }
}

export default ReadingModeToggle;
