import React, { Component, PropTypes } from 'react';
import {
  Col,
  Navbar,
  Nav
} from 'react-bootstrap';
import { Link } from 'react-router';

import ReciterDropdown from './ReciterDropdown';
import ContentDropdown from './ContentDropdown';
import SurahsDropdown from './SurahsDropdown';
import ReadingModeToggle from './ReadingModeToggle';
import FontSizeDropdown from './FontSizeDropdown';
import Audioplayer from 'components/Audioplayer';
import SearchInput from 'components/SearchInput';

const style = require('./style.scss');

function zeroPad(num, places) {
  const zero = places - num.toString().length + 1;

  return Array(+(zero > 0 && zero)).join('0') + num;
}

export default class SurahNavBar extends Component {
  static propTypes = {
    surah: PropTypes.object,
    options: PropTypes.object,
    children: PropTypes.object,
    handleOptionUpdate: PropTypes.func,
    lazyLoadAyahs: PropTypes.func
  };

  renderPrimaryNav() {
    const { surah } = this.props;

    return (
      <div className={`row ${style.primaryNav} nav-drawer`}>
        <Col xs={3} className="padding-none">
          <img src="http://quran-1f14.kxcdn.com/images/ornament-left.png" className={style.ornament} />
          {surah.id > 1 ?
            <Link to={`/${surah.id - 1}`} className={style.chapter}>
              <i className="ss-icon ss-navigateleft"></i>
              <span className="hidden-xs hidden-sm"> PREVIOUS SURAH</span>
            </Link>
            : null
          }
        </Col>
        <Col xs={6} className={`text-center ${style.title}`}>
          <img src={`http://quran-1f14.kxcdn.com/images/titles/${zeroPad(surah.id, 3)}.svg`}/>
          <span className="hidden-sm hidden-xs">{surah.name.simple} ({surah.name.english})</span>
        </Col>
        <Col xs={3} className="text-right padding-none">
          {surah.id < 114 ?
            <Link to={`/${surah.id + 1}`} className={style.chapter}>
              <span className="hidden-xs hidden-sm"> NEXT SURAH</span>
              <i className="ss-icon ss-navigateright"></i>
            </Link>
            : null
          }
          <img src="http://quran-1f14.kxcdn.com/images/ornament-right.png" className={style.ornament} />
        </Col>
      </div>
    );
  }

  render() {
    const { surah, handleOptionUpdate, lazyLoadAyahs, options, children } = this.props;

    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.renderPrimaryNav()}
        <Navbar.Collapse eventKey={0} className={style.bottomNav}>
          <Nav navbar>
            <SurahsDropdown surah={surah} />
            {children}
            <ReciterDropdown handleOptionUpdate={handleOptionUpdate} options={options} />
            <Audioplayer surah={surah} lazyLoadAyahs={lazyLoadAyahs} />
            <ContentDropdown handleOptionUpdate={handleOptionUpdate} options={options} />
            <FontSizeDropdown />
            <ReadingModeToggle />
          </Nav>

          <Nav navbar pullRight>
            <SearchInput isInNavbar />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
