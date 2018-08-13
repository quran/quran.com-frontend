import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import toNumber from 'lodash/toNumber';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { PropTypes as MetricsPropTypes } from 'react-metrics';
import { History } from 'history';

import T, { KEYS } from './T';
import SearchAutocompleteContainer from '../containers/SearchAutocompleteContainer';

const arabic = new RegExp(/[\u0600-\u06FF]/);
const shortcutSearch = /\d[\.,\:,\,,\\,//]/g;
const splitSearch = /[\.,\:,\,,\\,//]/g;

const Input = styled.input<{ isArabic?: boolean }>`
  text-align: ${({ isArabic }) => (isArabic ? 'right' : 'left')};
`;

const contextTypes = {
  metrics: MetricsPropTypes.metrics,
};

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

type Props = {
  history: History;
  className?: string;
};

type State = {
  value: string;
  showAutocomplete: boolean;
};

class SearchInput extends Component<Props & RouteComponentProps<{}>> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static contextTypes = contextTypes;

  readonly state: State = {
    value: '',
    showAutocomplete: false,
  };

  handleSearch = (value: string) => {
    const {
      history: { push },
    } = this.props;

    let verse;
    let chapter;
    const pattern = new RegExp(shortcutSearch);

    if (pattern.test(value)) {
      chapter = toNumber(value.split(splitSearch)[0]);
      verse = toNumber(value.split(splitSearch)[1]);

      if (isNaN(verse)) {
        verse = 1;
      }

      this.context.metrics.track('Search', {
        action: 'chapter',
        label: `/${chapter}/${verse}-${verse + 10}`,
      });

      return push(`/${chapter}/${verse}-${verse + 10}`);
    }

    this.context.metrics.track('Search', {
      action: 'query',
      label: value,
    });

    return push(`/search?q=${value}`);
  };

  handleKeyUp = (event: $TsFixMe) => {
    if (
      event.key === 'Enter' ||
      event.keyCode === 13 ||
      event.type === 'click'
    ) {
      const value = event.target.value.trim();

      this.handleSearch(value);
    }

    this.setState({ value: event.target.value.trim() });

    return null;
  };

  handleButtonClick = () => {
    const { value } = this.state;

    this.handleSearch(value);
  };

  handleInputFocus = () => this.setState({ showAutocomplete: true });

  handleInputBlur = () => this.setState({ showAutocomplete: false });

  render() {
    const { showAutocomplete, value } = this.state;
    const { className } = this.props;

    return (
      <div className={`right-inner-addon searchinput ${className}`}>
        <button type="button" onClick={this.handleButtonClick}>
          <i className="ss-icon ss-search" />
        </button>
        <Input
          type="search"
          placeholder={<T id={KEYS.SEARCH_PLACEHOLDER} /> as $TsFixMe}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onKeyUp={this.handleKeyUp}
          isArabic={arabic.test(value)}
        />
        {showAutocomplete && <SearchAutocompleteContainer value={value} />}
      </div>
    );
  }
}

export default withRouter(SearchInput);
