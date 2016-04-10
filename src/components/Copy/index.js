import React, { Component, PropTypes } from 'react';
import CopyToClipboard from 'copy-to-clipboard';

export default class Copy extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  state = {
    isCopied: false
  };

  handleCopy = () => {
    CopyToClipboard(this.props.text);
    this.setState({isCopied: true});

    setTimeout(() => this.setState({isCopied: false}), 1000);
  }

  render() {
    const { isCopied } = this.state;

    return (
      <a
        onClick={this.handleCopy}
        className={!isCopied && 'text-muted'}
        data-metrics-event-name="Ayah:Copy">
        <i className="ss-icon ss-attach" /> {isCopied ? 'Copied!' : 'Copy'}
      </a>
    );
  }
}
