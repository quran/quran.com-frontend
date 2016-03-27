import React, { Component, PropTypes } from 'react';

class ReadingModeToggle extends Component {
  static propTypes = {
    onReadingModeToggle: PropTypes.func
  }

  state = {
    toggled: false
  };

  toggleReadingMode(e) {
    e.preventDefault();

    this.setState({
      toggled: !this.state.toggled
    }, this.props.onReadingModeToggle);
  }

  renderIcon() {
    return <i className="ss-icon ss-openbook" />;
  }

  render() {
    const { toggled } = this.state;

    return (
      <a
        title="Toggle Reading Mode"
        className={`pointer nav-link toggle-icon ${toggled && 'active'}`}
        onClick={this.toggleReadingMode.bind(this)}>
        {this.renderIcon()}
        Reading: {toggled ? 'on' : 'off'}
      </a>
    );
  }
}

export default ReadingModeToggle;
