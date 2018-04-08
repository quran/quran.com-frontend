import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MetricsPropTypes } from 'react-metrics';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';

import SearchAutocomplete from 'components/SearchAutocomplete';

import debug from 'helpers/debug';

class SearchInput extends Component {
  static contextTypes = {
    metrics: MetricsPropTypes.metrics
  };

  state = {
    value: '',
    showAutocomplete: false,
    listening: false,
    voiceEnabled: false
  };

  componentDidMount() {
    if (__CLIENT__) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ voiceEnabled: !!this.getSpeechRecognizer() });
    }
  }

  shouldComponentUpdate(nextProps, newState) {
    return [
      this.state.voiceEnabled !== newState.voiceEnabled,
      this.state.newState !== newState.showAutocomplete
    ].some(test => test);
  }

  onSpeechResult = (event) => {
    const input = this.input;
    const text = event.results[0][0].transcript;

    input.value = text;
    this.setState({ value: text, showAutocomplete: true });
  };

  // eslint-disable-next-line no-unused-vars
  onSpeechEnd = (event) => {
    this.setState({ listening: false });
    // TODO: search ?
  };

  // eslint-disable-next-line no-unused-vars
  onSpeechError = (event) => {
    // TODO: should we show err to user?
  };

  getSpeechRecognizer = () =>
    window.SpeechRecognition || window.webkitSpeechRecognition;

  initSpeechRecongination = () => {
    if (this.state.listening) {
      return false;
    }
    const recognizer = new (this.getSpeechRecognizer())();

    recognizer.lang = 'ar';
    recognizer.interimResults = true;
    recognizer.onresult = this.onSpeechResult;
    recognizer.onend = this.onSpeechEnd;

    this.setState({ listening: true });
    recognizer.start();
    return false;
  };

  search = (event) => {
    const arabic = new RegExp(/[\u0600-\u06FF]/);
    const shortcutSearch = /\d[\.,\:,\,,\\,//]/g; // eslint-disable-line no-useless-escape
    const splitSearch = /[\.,\:,\,,\\,//]/g; // eslint-disable-line no-useless-escape

    if (
      event && (
        event.key === 'Enter' ||
        event.keyCode === 13 ||
        event.type === 'click'
       )
    ) {
      const inputEl = this.input;
      const searching = inputEl.value.trim();
      let ayah;
      let surah;

      // prevent search function while search input field is empty
      if (searching === '') {
        // reset input to display "Search" placeholder text
        inputEl.value = '';
        return false;
      }

      const pattern = new RegExp(shortcutSearch);

      if (pattern.test(searching)) {
        surah = parseInt(searching.split(splitSearch)[0], 10);
        ayah = parseInt(searching.split(splitSearch)[1], 10);

        if (isNaN(ayah)) {
          ayah = 1;
        }

        this.context.metrics.track('Search', {
          action: 'surah',
          label: `/${surah}/${ayah}-${ayah + 10}`
        });

        return this.props.push(`/${surah}/${ayah}-${ayah + 10}`);
      }

      this.context.metrics.track('Search', {
        action: 'query',
        label: searching
      });

      return this.props.push(`/search?q=${searching}`);
    }

    // This checks to see if the user is typing Arabic
    // and adjusts the text-align.
    if (arabic.test(event.target.value)) {
      event.target.style.textAlign = 'right'; // eslint-disable-line no-param-reassign
    } else {
      event.target.style.textAlign = 'left'; // eslint-disable-line no-param-reassign
    }

    if (this.input) {
      this.setState({ value: this.input.value.trim() });
    }

    return false;
  };

  renderVoiceSearch() {
    return (
      <a tabIndex="-1" onClick={this.initSpeechRecongination}>
        <i className="ss-icon ss-mic" />
      </a>
    );
  }

  render() {
    const { showAutocomplete, voiceEnabled } = this.state;
    const { className, intl } = this.props;
    const placeholder = intl.formatMessage({
      id: 'search.placeholder',
      defaultMessage: 'Search'
    });

    debug('component:SearchInput', 'Render');

    return (
      <div className={`right-inner-addon searchinput ${className}`}>
        <a tabIndex="-1" onClick={this.search}>
          <i className="ss-icon ss-search" />
        </a>
        {voiceEnabled && this.renderVoiceSearch()}
        <input
          type="search"
          placeholder={placeholder}
          ref={(input) => {
            this.input = input;
          }}
          onFocus={() => this.setState({ showAutocomplete: true })}
          // onBlur={() => this.setState({ showAutocomplete: false })}
          onKeyUp={this.search}
        />
        {showAutocomplete &&
          <SearchAutocomplete value={this.state.value} input={this.input} />}
      </div>
    );
  }
}

SearchInput.propTypes = {
  push: PropTypes.func.isRequired,
  className: PropTypes.string,
  intl: intlShape.isRequired
};

export default injectIntl(connect(null, { push })(SearchInput));
