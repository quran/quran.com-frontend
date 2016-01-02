import React, { Component, PropTypes } from 'react';
import { NavDropdown, MenuItem, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

@connect(state => ({surahs: state.surahs.entities}), { pushState })
export default class SurahsDropdown extends Component {
  static propTypes = {
    surahs: PropTypes.object,
    currentSurah: PropTypes.object,
    pushState: PropTypes.func
  }

  onSelect(event, surahId) {
    this.props.pushState(null, `/${surahId}`);
  }

  renderMenu() {
    const { surahs, currentSurah } = this.props;

    return Object.keys(surahs).map(surahId => {
      const surah = surahs[surahId];

      return (
        <MenuItem key={surah.name.english} eventKey={surah.id} onSelect={this.onSelect.bind(this)} active={surah.id === currentSurah.id}>
          <Row>
            <Col xs={2} className="text-muted">
              {surah.id}
            </Col>
            <Col xs={7}>
              {surah.name.simple}
              <br />
              <small className={`text-uppercase`}>{surah.name.english}</small>
            </Col>
            <Col xs={3} className={`text-right`}>
              {surah.name.arabic}
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
