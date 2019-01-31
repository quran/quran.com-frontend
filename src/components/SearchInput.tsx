import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import toNumber from 'lodash/toNumber';
import OutsideClickHandler from 'react-outside-click-handler';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { PropTypes as MetricsPropTypes } from 'react-metrics';
import { History } from 'history';

import T, { KEYS } from './T';
import SearchAutocompleteContainer from '../containers/SearchAutocompleteContainer';

const arabic = new RegExp(/[\u0600-\u06FF]/);
// eslint-disable-next-line
const shortcutSearch = /\d[\.,\:,\,,\\,//]/g;
// eslint-disable-next-line
const splitSearch = /[\.,\:,\,,\\,//]/g;

const Input = styled.input<{ isArabic?: boolean }>`
  text-align: ${({ isArabic }) => (isArabic ? 'right' : 'left')};
  width: 100%;
  padding: 20px 30px;
  padding-right: 60px;
  outline: none;
  border: none;
  background-color: #fff;
  color: ${({ theme }) => theme.brandPrimary};

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.brandPrimary};
    font-weight: 300;
  }

  &:-moz-placeholder {
    /* Firefox 18- */
    color: ${({ theme }) => theme.brandPrimary};
    font-weight: 300;
  }

  &::-moz-placeholder {
    /* Firefox 19+ */
    color: ${({ theme }) => theme.brandPrimary};
    font-weight: 300;
  }

  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.brandPrimary};
    font-weight: 300;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  padding: 15px 15px;
  font-size: 150%;
  background-color: ${({ theme }) => theme.brandPrimary};
  color: #fff;
  cursor: pointer;
  height: 100%;
  border: 3px solid #fff;

  &:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.brandPrimary)};
  }
`;

const contextTypes = {
  metrics: MetricsPropTypes.metrics,
};

const propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
};

const defaultProps = {
  className: '',
};

type Props = {
  history: History;
  className?: string;
} & RouteComponentProps<{}>;

type State = {
  value: string;
  showAutocomplete: boolean;
};

class SearchInput extends Component<Props> {
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
    const { metrics } = this.context;

    let verse;
    let chapter;
    const pattern = new RegExp(shortcutSearch);

    if (pattern.test(value)) {
      chapter = toNumber(value.split(splitSearch)[0]);
      verse = toNumber(value.split(splitSearch)[1]);

      if (isNaN(verse)) {
        verse = 1;
      }

      metrics.track('Search', {
        action: 'chapter',
        label: `/${chapter}/${verse}-${verse + 10}`,
      });

      return push(`/${chapter}/${verse}-${verse + 10}`);
    }

    metrics.track('Search', {
      action: 'query',
      label: value,
    });

    this.handleHideAutocomplete();

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

  handleHideAutocomplete = () => this.setState({ showAutocomplete: false });

  render() {
    const { showAutocomplete, value } = this.state;
    const { className } = this.props;

    return (
      <OutsideClickHandler onOutsideClick={this.handleHideAutocomplete}>
        <div className={`right-inner-addon searchinput ${className}`}>
          <Button type="button" onClick={this.handleButtonClick}>
            <i className="ss-icon ss-search" />
          </Button>
          <T id={KEYS.SEARCH_PLACEHOLDER}>
            {placeholder => (
              <Input
                type="search"
                placeholder={placeholder as string}
                onFocus={this.handleInputFocus}
                onKeyUp={this.handleKeyUp}
                isArabic={arabic.test(value)}
              />
            )}
          </T>
          {showAutocomplete && <SearchAutocompleteContainer value={value} />}
        </div>
      </OutsideClickHandler>
    );
  }
}

export default withRouter(SearchInput);
