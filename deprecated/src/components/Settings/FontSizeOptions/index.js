import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import styled from 'styled-components';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import Icon from 'quran-components/lib/Icon';

const Title = styled.div`
  padding: 10px 15px;
`;

const List = styled.ul`
  display: table;
  width: 100%;
  padding: 15px 0;
`;

const Item = styled.li`
  list-style-type: none;
  display: table-cell;
  width: 33%;
`;

const ItemLink = styled.li`
  position: relative;
  display: block;
  cursor: pointer;
  color: #777;
`;

const Reset = styled(Icon)`
  float: right;
  cursor: pointer;
`;

class FontSizeOptions extends Component {
  handleOptionSelected = (type, direction) => {
    const { onOptionChange, fontSize } = this.props;
    const changeFactor = {
      translation: 0.5,
      arabic: 0.5,
    };

    return onOptionChange({
      fontSize: {
        ...fontSize,
        [type]: fontSize[type] + changeFactor[type] * direction,
      },
    });
  };

  resetFontSize = () => {
    const { onOptionChange } = this.props;

    return onOptionChange({
      fontSize: {
        arabic: 3.5,
        translation: 2,
      },
    });
  };

  renderOptions() {
    return (
      <div>
        <List>
          <Item className="text-center">
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('arabic', -1)}
              className="pointer"
            >
              <i className="ss-icon ss-hyphen" />
            </a>
          </Item>
          <Item className="text-center">
            <LocaleFormattedMessage
              id="setting.fontSize.arabic"
              defaultMessage="Arabic"
            />
          </Item>
          <Item className="text-center">
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('arabic', 1)}
              className="pointer"
            >
              <i className="ss-icon ss-plus" />
            </a>
          </Item>
        </List>
        <br />
        <List>
          <Item className="text-center">
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('translation', -1)}
              className="pointer"
            >
              <i className="ss-icon ss-hyphen" />
            </a>
          </Item>
          <Item className="text-center">
            <LocaleFormattedMessage
              id="setting.translations.title"
              defaultMessage="Translations"
            />
          </Item>
          <Item className="text-center">
            <a
              tabIndex="-1"
              onClick={() => this.handleOptionSelected('translation', 1)}
              className="pointer"
            >
              <i className="ss-icon ss-plus" />
            </a>
          </Item>
        </List>
      </div>
    );
  }

  renderTitle() {
    return (
      <Title>
        <LocaleFormattedMessage
          id="setting.fontSize"
          defaultMessage="Font Size"
        />
        <Reset
          type="refresh"
          className="text-right"
          onClick={this.resetFontSize}
        />
      </Title>
    );
  }
  render() {
    return (
      <div>
        {this.renderTitle()}
        <ItemLink>{this.renderOptions()}</ItemLink>
      </div>
    );
  }
}

FontSizeOptions.propTypes = {
  onOptionChange: PropTypes.func,
  fontSize: customPropTypes.fontSize.isRequired,
};

export default FontSizeOptions;
