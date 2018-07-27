import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copyToClipboard from 'copy-to-clipboard';
import T, { KEYS } from './T';

import { COPY_EVENTS } from '../events';

const propTypes = {
  text: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired,
};

type Props = {
  text: string;
  verseKey: string;
};

type State = {
  isCopied: boolean;
};

class VerseCopy extends Component<Props, State> {
  public static propTypes = propTypes;

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
      <button
        type="button"
        onClick={this.handleCopy}
        className={`${!isCopied && 'text-muted'} btn btn-link`}
        {...COPY_EVENTS.CLICK.VERSE.PROPS}
        data-metrics-verse-key={verseKey}
        data-metrics-chapter-id={verseKey.split(':')[0]}
        data-metrics-verse-id={verseKey.split(':')[1]}
      >
        <i className="ss-icon ss-attach vertical-align-middle" />{' '}
        <T id={isCopied ? KEYS.ACTIONS_COPIED : KEYS.ACTIONS_COPY} />
      </button>
    );
  }
}

export default VerseCopy;
