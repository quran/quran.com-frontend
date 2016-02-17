import React, { Component, PropTypes } from 'react';
import { NavDropdown, MenuItem, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

@connect(state => ({surahs: state.surahs.entities}), { pushState })
export default class SurahsDropdown extends Component {
  static propTypes = {
    surahs: PropTypes.object,
    surah: PropTypes.object,
    pushState: PropTypes.func
  };

  onSelect(event, surahId) {
    this.props.pushState(null, `/${surahId}`);
  }

  renderMenu() {
    const { surahs, surah } = this.props;

    return Object.keys(surahs).map(surahId => {
      const surahItem = surahs[surahId];

      return (
        <MenuItem
          key={surahItem.name.english}
          eventKey={surahItem.id}
          onSelect={this.onSelect.bind(this)}
          active={surahItem.id === surah.id}
        >
          <Row>
            <Col xs={2}>
              {surahItem.id}
            </Col>
            <Col xs={7}>
              {surahItem.name.simple}
              <br />
              <small className={`text-uppercase`}>{surahItem.name.english}</small>
            </Col>
            <Col xs={3} className={`text-right`}>
              {surahItem.name.arabic}
            </Col>
            </Row>
        </MenuItem>
      );
    });
  }

  render() {
    const style = require('./style.scss');

    const title = (
      <span>
        {/* <i className="ss-icon ss-list margin-md-right" /> */}
        Surahs
      </span>
    );

    return (
      <NavDropdown eventKey={3} title={title} id="surahs-dropdown"className={`${style.dropdown} bordered`}>
        {this.renderMenu()}
      </NavDropdown>
    );
  }
}
