import React, { PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const styles = require('./style.scss');

const SurahsDropdown = ({ surahs, className }) => {
  const list = surahs.map((surah, index) => {

    return (
      <LinkContainer to={`/${surah.id}`} activeClass="active" key={`surah-${index}`}>
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
            <Col xs={3} md={3} className="text-right">
              {surah.name.arabic}
            </Col>
          </Row>
        </MenuItem>
      </LinkContainer>
    );
  });

  const title = (
    <span>
      Surahs
    </span>
  );

  return (
    <div className={`dropdown ${className} ${styles.dropdown}`}>
      <button
        className={`btn btn-link no-outline`}
        id="surahs-dropdown"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        {title}
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" aria-labelledby="surahs-dropdown">
        {list}
      </ul>
    </div>
  );
};

SurahsDropdown.propTypes = {
  surahs: PropTypes.array.isRequired
};

SurahsDropdown.defaultProps = {
  className: 'col-md-3'
};

export default SurahsDropdown;
