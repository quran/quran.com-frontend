import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormControl from 'react-bootstrap/lib/FormControl';
import { intlShape, injectIntl } from 'react-intl';
import SwitchToggle from 'components/SwitchToggle';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const style = require('../style.scss');

class RepeatButton extends Component {
  handleToggle = () => {
    const { repeat, setRepeat, current } = this.props;

    if (repeat.from) {
      return setRepeat({});
    }

    return setRepeat({
      from: current,
      to: current
    });
  };

  handleNavChange = nav => {
    const { setRepeat, current } = this.props;

    if (nav === 1) {
      // Should set single ayah
      return setRepeat({
        from: current,
        to: current
      });
    }

    return setRepeat({
      from: current,
      to: current + 3
    });
  };

  renderRangeAyahs() {
    const { chapter, repeat, setRepeat } = this.props;
    const array = Array(chapter.versesCount).join().split(',');

    return (
      <div className="col-md-12" style={{ paddingTop: 15 }}>
        <ul className="list-inline" style={{ marginBottom: 0 }}>
          <li>
            <LocaleFormattedMessage
              id="player.repeat.rangeStart"
              defaultMessage="From"
            />
            {' '}
            :
            <br />
            <FormControl
              componentClass="select"
              value={repeat.from}
              onChange={event => {
                let to = parseInt(event.target.value, 10) + 3;
                to = to < chapter.versesCount ? to : chapter.versesCount;
                setRepeat({
                  ...repeat,
                  from: parseInt(event.target.value, 10),
                  to
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
            <LocaleFormattedMessage
              id="player.repeat.rangeEnd"
              defaultMessage="To"
            />
            {' '}
            :
            <br />
            <FormControl
              componentClass="select"
              value={repeat.to}
              onChange={event =>
                setRepeat({ ...repeat, to: parseInt(event.target.value, 10) })}
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
    const array = Array(chapter.versesCount).join().split(',');

    return (
      <div className="col-md-12" style={{ paddingTop: 15 }}>
        <LocaleFormattedMessage
          id="player.currentVerse"
          defaultMessage="Ayah"
        />
        {' '}
        :
        {' '}
        <br />
        <FormControl
          componentClass="select"
          value={repeat.from}
          onChange={event =>
            setRepeat({
              ...repeat,
              from: parseInt(event.target.value, 10),
              to: parseInt(event.target.value, 10)
            })}
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
      <div className={`${!repeat.from && style.disabled} row`}>
        <div className="col-md-12">
          <Nav
            bsStyle="pills"
            activeKey={repeat.from === repeat.to ? 1 : 2}
            onSelect={this.handleNavChange}
          >
            <NavItem eventKey={1} title="Single Ayah" className={style.pill}>
              <LocaleFormattedMessage
                id="player.repeat.single"
                defaultMessage="Single"
              />
            </NavItem>
            <NavItem eventKey={2} title="Range" className={style.pill}>
              <LocaleFormattedMessage
                id="player.repeat.range"
                defaultMessage="Range"
              />
            </NavItem>
          </Nav>
        </div>
      </div>
    );
  }

  renderOptions() {
    const { repeat } = this.props;

    return (
      <div className={`${!repeat.from && style.disabled} row`}>
        {repeat.from === repeat.to
          ? this.renderSingleAyah()
          : this.renderRangeAyahs()}
      </div>
    );
  }

  renderTimes() {
    const { repeat, setRepeat, intl } = this.props;
    const times = Array(10).join().split(',');

    return (
      <div className={`${!repeat.from && style.disabled} row`}>
        <div className="col-md-12" style={{ paddingTop: 15 }}>
          <LocaleFormattedMessage
            id="player.repeat.title"
            defaultMessage="Repeat"
          />
          :
          {' '}
          <br />
          <FormControl
            componentClass="select"
            value={repeat.times}
            onChange={event =>
              setRepeat({
                ...repeat,
                times: parseInt(event.target.value, 10)
              })}
          >
            <option value={'Infinity'}>
              {intl.formatMessage({
                id: 'player.repeat.loop',
                defaultMessage: 'Loop'
              })}
            </option>
            {times.map((ayah, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </FormControl>
        </div>
      </div>
    );
  }

  render() {
    const { repeat } = this.props;

    const popover = (
      <Popover
        id="FontSizeDropdown"
        className={style.popover}
        title={
          <div className="row">
            <div className="col-md-12 text-center">
              <LocaleFormattedMessage
                id="player.repeat.title"
                defaultMessage="TOGGLE REPEAT"
              />
              {'  '}
              <SwitchToggle
                checked={!!repeat.from}
                onToggle={this.handleToggle}
                id="repeat-toggle"
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
          <i
            className={`pointer ss-icon ss-repeat ${style.buttons} ${repeat.from && style.repeat}`}
          />
        </OverlayTrigger>
      </div>
    );
  }
}

RepeatButton.propTypes = {
  chapter: customPropTypes.surahType,
  repeat: customPropTypes.timeInterval,
  setRepeat: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(RepeatButton);
