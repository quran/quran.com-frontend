import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copyToClipboard from 'copy-to-clipboard';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { COPY_EVENTS } from '../../events';

class Copy extends Component {
  state = {
    isCopied: false,
  };

  handleCopy = () => {
    const { text, verseKey } = this.props;

    copyToClipboard(`${text} - ${verseKey}`);
    this.setState({ isCopied: true });

    setTimeout(() => this.setState({ isCopied: false }), 1000);
  };

  render() {
    const { verseKey } = this.props;
    const { isCopied } = this.state;

    return (
      <a
        tabIndex="-1"
        onClick={this.handleCopy}
        className={!isCopied && 'text-muted'}
        {...COPY_EVENTS.CLICK.VERSE.PROPS}
        data-metrics-verse-key={verseKey}
        data-metrics-chapter-id={verseKey.split(':')[0]}
        data-metrics-verse-id={verseKey.split(':')[1]}
      >
        <i className="ss-icon ss-attach vertical-align-middle" />{' '}
        <LocaleFormattedMessage
          id={isCopied ? [KEYS.ACTIONS_COPIED] : [KEYS.ACTIONS_COPY]}
          defaultMessage={isCopied ? 'Copied!' : 'Copy'}
        />
      </a>
    );
  }
}

Copy.propTypes = {
  text: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired,
};

export default Copy;
