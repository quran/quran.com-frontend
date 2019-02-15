import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'quran-components/lib/Icon';
import T, { KEYS } from '../T';
import { SetSetting } from '../../redux/actions/settings';
import { FontSizeSettingShape } from '../../shapes';

const Title = styled.div`
  padding: 10px 15px;
`;

const List = styled.ul`
  display: table;
  width: 100%;
  padding: 15px 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.whiteSmoke}};
    color: #1d1f21;
  }
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

const propTypes = {
  onChange: PropTypes.func.isRequired,
  fontSize: FontSizeSettingShape.isRequired,
};

type Props = {
  onChange: SetSetting;
  fontSize: FontSizeSettingShape;
};

class FontSizeOptions extends Component<Props> {
  static propTypes = propTypes;

  handleFontSizeReset = () => {
    const { onChange } = this.props;

    return onChange({
      fontSize: {
        arabic: 3.5,
        translation: 2,
      },
    });
  };

  handleOptionSelected = (type: string, direction: number) => {
    const { onChange, fontSize } = this.props;
    const changeFactor: { [key: string]: number } = {
      translation: 0.5,
      arabic: 0.5,
    };

    return onChange({
      fontSize: {
        ...fontSize,
        [type]:
          (fontSize as FontSizeSettingShape & { [key: string]: number })[type] +
          changeFactor[type] * direction,
      },
    });
  };

  render() {
    return (
      <div>
        <Title>
          <T id={KEYS.SETTING_FONTSIZE} />
          <Reset
            type="refresh"
            className="text-right"
            onClick={this.handleFontSizeReset}
          />
        </Title>
        <ItemLink>
          <div>
            <List>
              <Item className="text-center">
                <button
                  type="button"
                  onClick={() => this.handleOptionSelected('arabic', -1)}
                  className="pointer btn btn-link"
                >
                  <i className="ss-icon ss-hyphen" />
                </button>
              </Item>
              <Item className="text-center">
                <T id={KEYS.SETTING_FONTSIZE_ARABIC} />
              </Item>
              <Item className="text-center">
                <button
                  type="button"
                  onClick={() => this.handleOptionSelected('arabic', 1)}
                  className="pointer btn btn-link"
                >
                  <i className="ss-icon ss-plus" />
                </button>
              </Item>
            </List>
            <br />
            <List>
              <Item className="text-center">
                <button
                  type="button"
                  onClick={() => this.handleOptionSelected('translation', -1)}
                  className="pointer btn btn-link"
                >
                  <i className="ss-icon ss-hyphen" />
                </button>
              </Item>
              <Item className="text-center">
                <T id={KEYS.SETTING_TRANSLATIONS_TITLE} />
              </Item>
              <Item className="text-center">
                <button
                  type="button"
                  onClick={() => this.handleOptionSelected('translation', 1)}
                  className="btn btn-link"
                >
                  <i className="ss-icon ss-plus" />
                </button>
              </Item>
            </List>
          </div>
        </ItemLink>
      </div>
    );
  }
}

export default FontSizeOptions;
