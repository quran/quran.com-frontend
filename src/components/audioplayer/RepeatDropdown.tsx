import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import toNumber from 'lodash/toNumber';
import range from 'lodash/range';
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
import { SetRepeat } from '../../redux/actions/audioplayer';

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
  chapter: ChapterShape.isRequired,
  repeat: RepeatShape.isRequired,
  setRepeat: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
};

type Props = {
  chapter: ChapterShape;
  repeat: RepeatShape;
  setRepeat: SetRepeat;
  current: number;
};

class RepeatButton extends Component<Props> {
  static propTypes = propTypes;

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

  handleNavChange = (nav: number) => {
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

  // TODO: PLEASE DON'T DO renderXYZ
  renderRangeAyahs() {
    const { chapter, repeat, setRepeat } = this.props;
    const array = range(chapter.versesCount);

    return (
      <div className="col-md-12" style={{ paddingTop: 15 }}>
        <ul className="list-inline" style={{ marginBottom: 0 }}>
          <li>
            <T id={KEYS.AUDIOPLAYER_REPEAT_RANGESTART} /> :
            <br />
            <FormControl
              componentClass="select"
              value={repeat.from}
              onChange={(event: $TsFixMe) => {
                let to = toNumber(event.target.value) + 3;

                to = to < chapter.versesCount ? to : chapter.versesCount;

                setRepeat({
                  ...repeat,
                  from: toNumber(event.target.value),
                  to,
                });
              }}
            >
              {array.reduce(
                (options, time) => {
                  if (time + 1 < chapter.versesCount) {
                    // Exclude last verse
                    options.push(
                      <option key={time} value={time + 1}>
                        {time + 1}
                      </option>
                    );
                  }

                  return options;
                },
                [] as Array<JSX.Element>
              )}
            </FormControl>
          </li>
          <li> - </li>
          <li>
            <T id={KEYS.AUDIOPLAYER_REPEAT_RANGEEND} /> :
            <br />
            <FormControl
              componentClass="select"
              value={repeat.to}
              onChange={(event: $TsFixMe) =>
                setRepeat({ ...repeat, to: parseInt(event.target.value, 10) })
              }
            >
              {array.reduce(
                (options, time) => {
                  if (
                    (repeat.from ? repeat.from : 1) < time + 1 &&
                    time + 1 <= chapter.versesCount
                  ) {
                    // eslint-disable-line max-len
                    options.push(
                      <option key={time} value={time + 1}>
                        {time + 1}
                      </option>
                    );
                  }

                  return options;
                },
                [] as Array<JSX.Element>
              )}
            </FormControl>
          </li>
        </ul>
      </div>
    );
  }

  // TODO: PLEASE DON'T DO renderXYZ
  renderSingleAyah() {
    const { repeat, setRepeat, chapter } = this.props;
    const array = range(chapter.versesCount);

    return (
      <div className="col-md-12" style={{ paddingTop: 15 }}>
        <T id={KEYS.AUDIOPLAYER_CURRENTVERSE} /> : <br />
        <FormControl
          componentClass="select"
          value={repeat.from}
          onChange={(event: $TsFixMe) =>
            setRepeat({
              ...repeat,
              from: parseInt(event.target.value, 10),
              to: parseInt(event.target.value, 10),
            })
          }
        >
          {array.map(time => (
            <option key={time} value={time + 1}>
              {time + 1}
            </option>
          ))}
        </FormControl>
      </div>
    );
  }

  render() {
    const { repeat, setRepeat } = this.props;
    const times = range(10);

    const popover = (
      <Popover
        id="repeat-toggle-popover"
        title={
          <div className="row">
            <div className="col-md-12 text-center">
              <T id={KEYS.AUDIOPLAYER_REPEAT_TITLE} />
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
        <Item className="row" disabled={!repeat.from}>
          {repeat.from === repeat.to
            ? this.renderSingleAyah()
            : this.renderRangeAyahs()}
        </Item>
        <Item className="row" disabled={!repeat.from}>
          <div className="col-md-12" style={{ paddingTop: 15 }}>
            <T id={KEYS.AUDIOPLAYER_REPEAT_TITLE} />
            : <br />
            <FormControl
              componentClass="select"
              value={repeat.times}
              onChange={(event: $TsFixMe) =>
                setRepeat({
                  ...repeat,
                  times: toNumber(event.target.value),
                })
              }
            >
              <option value="Infinity">
                <T id={KEYS.AUDIOPLAYER_REPEAT_LOOP} />
              </option>
              {times.map(time => (
                <option key={time} value={time + 1}>
                  {time + 1}
                </option>
              ))}
            </FormControl>
          </div>
        </Item>
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
