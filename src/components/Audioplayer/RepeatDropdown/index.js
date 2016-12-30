import React, { Component, PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import { intlShape, injectIntl } from 'react-intl';

import SwitchToggle from 'components/SwitchToggle';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import surahType from 'types/surahType';

const style = require('../style.scss');

class RepeatButton extends Component {
  static propTypes = {
    surah: surahType,
    repeat: PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number,
      times: PropTypes.number
    }).isRequired,
    setRepeat: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    intl: intlShape.isRequired
  };

  handleToggle = () => {
    const { repeat, setRepeat, current } = this.props;

    if (repeat.from) {
      return setRepeat({});
    }

    return setRepeat({
      from: current,
      to: current
    });
  }

  handleNavChange = (nav) => {
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
  }

  renderRangeAyahs() {
    const { surah, repeat, setRepeat } = this.props;
    const array = Array(surah.ayat).join().split(',');

    return (
      <Col md={12} style={{ paddingTop: 15 }}>
        <ul className="list-inline" style={{ marginBottom: 0 }}>
          <li>
            <LocaleFormattedMessage
              id="player.repeat.rangeStart"
              defaultMessage="From"
            />{' '}:
            <br />
            <FormControl
              componentClass="select"
              value={repeat.from}
              onChange={event => setRepeat({
                ...repeat,
                from: parseInt(event.target.value, 10),
                to: parseInt(event.target.value, 10) + 3
              })}
            >
              {
                array.map((ayah, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))
              }
            </FormControl>
          </li>
          <li> - </li>
          <li>
            <LocaleFormattedMessage
              id="player.repeat.rangeEnd"
              defaultMessage="To"
            />{' '}:
            <br />
            <FormControl
              componentClass="select"
              value={repeat.to}
              onChange={event => setRepeat({ ...repeat, to: parseInt(event.target.value, 10) })}
            >
              {
                array.map((ayah, index) => (
                  <option key={index} value={repeat.from ? index + 1 + repeat.from : index + 1}>
                    {repeat.from ? index + 1 + repeat.from : index + 1}
                  </option>
                ))
              }
            </FormControl>
          </li>
        </ul>
      </Col>
    );
  }

  renderSingleAyah() {
    const { repeat, setRepeat, surah } = this.props;
    const array = Array(surah.ayat).join().split(',');

    return (
      <Col md={12} style={{ paddingTop: 15 }}>
        <LocaleFormattedMessage
          id="player.currentAyah"
          defaultMessage="Ayah"
        />{' '}: <br />
        <FormControl
          componentClass="select"
          value={repeat.from}
          onChange={event => setRepeat({
            ...repeat,
            from: parseInt(event.target.value, 10),
            to: parseInt(event.target.value, 10)
          })}
        >
          {
            array.map((ayah, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))
          }
        </FormControl>
      </Col>
    );
  }

  renderNav() {
    const { repeat } = this.props;

    return (
      <div className={`${!repeat.from && style.disabled} row`}>
        <Col md={12}>
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
        </Col>
      </div>
    );
  }

  renderOptions() {
    const { repeat } = this.props;

    return (
      <div className={`${!repeat.from && style.disabled} row`}>
        {repeat.from === repeat.to ? this.renderSingleAyah() : this.renderRangeAyahs()}
      </div>
    );
  }

  renderTimes() {
    const { repeat, setRepeat, intl } = this.props;
    const times = Array(10).join().split(',');

    return (
      <div className={`${!repeat.from && style.disabled} row`}>
        <Col md={12} style={{ paddingTop: 15 }}>
          <LocaleFormattedMessage
            id="player.repeat.title"
            defaultMessage="Repeat"
          />: <br />
          <FormControl
            componentClass="select"
            value={repeat.times}
            onChange={event => setRepeat({
              ...repeat,
              times: parseInt(event.target.value, 10)
            })}
          >
            <option value={'Infinity'}>
              {
                intl.formatMessage({ id: 'player.repeat.loop', defaultMessage: 'Loop' })
              }
            </option>
            {
              times.map((ayah, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))
            }
          </FormControl>
        </Col>
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
            <Col md={12} className="text-center">
              <LocaleFormattedMessage
                id="player.repeat.title"
                defaultMessage="TOGGLE REPEAT"
              />{'  '}
              <SwitchToggle
                checked={!!repeat.from}
                onToggle={this.handleToggle}
                id="repeat-toggle"
                flat
              />
            </Col>
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

export default injectIntl(RepeatButton);
