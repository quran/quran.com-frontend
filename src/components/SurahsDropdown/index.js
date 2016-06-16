import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import surahUrl from 'utils/SurahUrl';

const styles = require('./style.scss');

export default class SurahsDropdown extends Component {
  static propTypes = {
    surahs: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'col-md-3'
  };

  shouldComponentUpdate(nextProps) {
    return this.props.surahs !== nextProps.surahs;
  }

  renderList() {
    const { surahs } = this.props;

    return Object.values(surahs).map((surah, index) => (
      <LinkContainer to={surahUrl(surah.id, surah.nameSimple)} activeClass="active" key={`surah-${index}`}>
       <MenuItem>
          <Row>
            <Col xs={2} md={2}>
              <span className="surah-num">
                {surah.id}
              </span>
            </Col>
            <Col xs={7} md={7}>
              <span className="suran-name">{surah.name.simple}</span>
              <br />
              <span className="surah-meaning">{surah.name.english}</span>
            </Col>
            <Col xs={3} md={3} className={`text-right ${styles.arabic_name}`}>
              {surah.name.arabic}
            </Col>
          </Row>
        </MenuItem>
      </LinkContainer>
    ));
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`dropdown ${className} ${styles.dropdown}`}>
        <button
          className={`btn btn-link no-outline`}
          id="surahs-dropdown"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          Surahs
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="surahs-dropdown">
          {this.renderList()}
        </ul>
      </div>
    );
  }
};
