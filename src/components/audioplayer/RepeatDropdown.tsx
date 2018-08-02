import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import toNumber from 'lodash/toNumber';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormControl from 'react-bootstrap/lib/FormControl';
import SwitchToggle from 'quran-components/lib/Toggle';
import T, { KEYS } from '../T';

import ControlButton from './ControlButton';
import Popover from './Popover';
import { ChapterShape } from '../../shapes';
import RepeatShape from '../../shapes/RepeatShape';

const Pill = styled(NavItem)`
  a {
    padding: 10px 15px;
  }
`;

const disabledCss = css`
  opacity: 0.5;
  cursor: not-allowed !important;
  pointer-events: none;
`;

const Item = styled.div<{ disabled?: boolean }>`
  ${({ disabled }) => (disabled ? disabledCss : '')};
`;

const propTypes = {
  chapter: ChapterShape,
  repeat: RepeatShape,
  setRepeat: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
};

type Props = {};

class RepeatButton extends Component {
  handleToggle = () => {
    const { repeat, setRepeat, current } = this.props;

    if (repeat.from) {
      return setRepeat({});
    }

    return setRepeat({
      from: current,
      to: current,
    });
  };

  handleNavChange = nav => {
    const { setRepeat, current } = this.props;

    if (nav === 1) {
      // Should set single ayah
      return setRepeat({
        from: current,
        to: current,
      });
    }

    return setRepeat({
      from: current,
      to: current + 3,
    });
  };

  renderRangeAyahs() {
    const { chapter, repeat, setRepeat } = this.props;
    const array = Array(chapter.versesCount)
      .join()
      .split(',');

    return (
      <div className="col-md-12" style={{ paddingTop: 15 }}>
        <ul className="list-inline" style={{ marginBottom: 0 }}>
          <li>
            <T id={KEYS.AUDIOPLAYER_REPEAT_RANGESTART} /> :
            <br />
            <FormControl
              componentClass="select"
              value={repeat.from}
              onChange={event => {
                let to = toNumber(event.target.value) + 3;
                to = to < chapter.versesCount ? to : chapter.versesCount;
                setRepeat({
                  ...repeat,
                  from: toNumber(event.target.value),
                  to,
                });
              }}
            >
              {array.reduce((options, ayah, index) => {
                if (index + 1 < chapter.versesCount) {
                  // Exclude last verse
                  options.push(
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                }
                return options;
              }, [])}
            </FormControl>
          </li>
          <li> - </li>
          <li>
            <T id={KEYS.AUDIOPLAYER_REPEAT_RANGEEND} /> :
            <br />
            <FormControl
              componentClass="select"
              value={repeat.to}
              onChange={event =>
                setRepeat({ ...repeat, to: parseInt(event.target.value, 10) })
              }
            >
              {array.reduce((options, ayah, index) => {
                if (
                  (repeat.from ? repeat.from : 1) < index + 1 &&
                  index + 1 <= chapter.versesCount
                ) {
                  // eslint-disable-line max-len
                  options.push(
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                }
                return options;
              }, [])}
            </FormControl>
          </li>
        </ul>
      </div>
    );
  }

  renderSingleAyah() {
    const { repeat, setRepeat, chapter } = this.props;
    const array = Array(chapter.versesCount)
      .join()
      .split(',');

    return (
      <div className="col-md-12" style={{ paddingTop: 15 }}>
        <T id={KEYS.AUDIOPLAYER_CURRENTVERSE} /> : <br />
        <FormControl
          componentClass="select"
          value={repeat.from}
          onChange={event =>
            setRepeat({
              ...repeat,
              from: parseInt(event.target.value, 10),
              to: parseInt(event.target.value, 10),
            })
          }
        >
          {array.map((ayah, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </FormControl>
      </div>
    );
  }

  renderNav() {
    const { repeat } = this.props;

    return (
      <Item className="row" disabled={!repeat.from}>
        <div className="col-md-12">
          <Nav
            bsStyle="pills"
            activeKey={repeat.from === repeat.to ? 1 : 2}
            onSelect={this.handleNavChange}
          >
            <Pill eventKey={1} title="Single Ayah">
              <T id={KEYS.AUDIOPLAYER_REPEAT_SINGLE} />
            </Pill>
            <Pill eventKey={2} title="Range">
              <T id={KEYS.AUDIOPLAYER_REPEAT_RANGE} />
            </Pill>
          </Nav>
        </div>
      </Item>
    );
  }

  renderOptions() {
    const { repeat } = this.props;

    return (
      <Item className="row" disabled={!repeat.from}>
        {repeat.from === repeat.to
          ? this.renderSingleAyah()
          : this.renderRangeAyahs()}
      </Item>
    );
  }

  renderTimes() {
    const { repeat, setRepeat } = this.props;
    const times = Array(10)
      .join()
      .split(',');

    return (
      <Item className="row" disabled={!repeat.from}>
        <div className="col-md-12" style={{ paddingTop: 15 }}>
          <T id={KEYS.AUDIOPLAYER_REPEAT_TITLE} />
          : <br />
          <FormControl
            componentClass="select"
            value={repeat.times}
            onChange={event =>
              setRepeat({
                ...repeat,
                times: toNumber(event.target.value),
              })
            }
          >
            <option value="Infinity">
              <T id={KEYS.AUDIOPLAYER_REPEAT_LOOP} />
            </option>
            {times.map((ayah, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </FormControl>
        </div>
      </Item>
    );
  }

  render() {
    const { repeat } = this.props;

    const popover = (
      <Popover
        id="repeat-toggle-popover"
        title={
          <div className="row">
            <div className="col-md-12 text-center">
              <T id={KEYS.AUDIOPLAYER_REPEAT_TITLE} />
              " '}"{' '}
              <SwitchToggle
                checked={repeat.from}
                onToggle={this.handleToggle}
                id="repeat-toggle"
                name="repeat-toggle"
                flat
              />
            </div>
          </div>
        }
      >
        {this.renderNav()}
        {this.renderOptions()}
        {this.renderTimes()}
      </Popover>
    );

    return (
      <div className="text-center">
        <OverlayTrigger
          overlay={popover}
          placement="top"
          trigger="click"
          rootClose
        >
          <ControlButton active={!!repeat.from}>
            <i className="ss-icon ss-repeat" />
          </ControlButton>
        </OverlayTrigger>
      </div>
    );
  }
}

export default RepeatButton;
