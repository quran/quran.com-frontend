import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copyToClipboard from 'copy-to-clipboard';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

class Copy extends Component {
  state = {
    isCopied: false
  };

  handleCopy = () => {
    copyToClipboard(`${this.props.text} - ${this.props.verseKey}`);
    this.setState({ isCopied: true });

    setTimeout(() => this.setState({ isCopied: false }), 1000);
  };

  render() {
    const { isCopied } = this.state;

    return (
      <a
        tabIndex="-1"
        onClick={this.handleCopy}
        className={!isCopied && 'text-muted'}
        data-metrics-event-name="Ayah:Copy"
      >
        <i className="ss-icon ss-attach vertical-align-middle" />{' '}
        <LocaleFormattedMessage
          id={isCopied ? 'actions.copied' : 'actions.copy'}
          defaultMessage={isCopied ? 'Copied!' : 'Copy'}
        />
      </a>
    );
  }
}

Copy.propTypes = {
  text: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired
};

export default Copy;
