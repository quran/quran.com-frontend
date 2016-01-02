import React, { Component, PropTypes } from 'react';
import {
  Col,
  Navbar,
  CollapsibleNav,
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
    currentSurah: PropTypes.object,
    options: PropTypes.object,
    children: PropTypes.object,
    handleOptionUpdate: PropTypes.func,
    lazyLoadAyahs: PropTypes.func
  }

  render() {
    const { currentSurah, handleOptionUpdate, lazyLoadAyahs, options, children } = this.props;

    return (
      <Navbar fixedTop toggleNavKey={0} fluid>
        <div className={`row ${style.primaryNav}`}>
          <Col xs={3} className="padding-none">
            <img src="http://quran-1f14.kxcdn.com/images/ornament-left.png" className={style.ornament} />
            {currentSurah.id > 1 ?
              <Link to={`/${currentSurah.id + 1}`} className={style.chapter}>
                <i className="ss-icon ss-navigateleft"></i>
                <span className="hidden-xs hidden-sm"> PREVIOUS SURAH</span>
              </Link>
              : null
            }
          </Col>
          <Col xs={6} className={`text-center ${style.title}`}>
            <img src={`http://quran-1f14.kxcdn.com/images/titles/${zeroPad(currentSurah.id, 3)}.svg`}/>
            <span>{currentSurah.name.simple} ({currentSurah.name.english})</span>
          </Col>
          <Col xs={3} className="text-right padding-none">
            {currentSurah.id < 114 ?
              <Link to={`/${currentSurah.id - 1}`} className={style.chapter}>
                <span className="hidden-xs hidden-sm"> NEXT SURAH</span>
                <i className="ss-icon ss-navigateright"></i>
              </Link>
              : null
            }
            <img src="http://quran-1f14.kxcdn.com/images/ornament-right.png" className={style.ornament} />
          </Col>
        </div>
        <CollapsibleNav eventKey={0} className={style.bottomNav}>
          <Nav navbar>
            <SurahsDropdown currentSurah={currentSurah} />
            {children}
            <ReciterDropdown handleOptionUpdate={handleOptionUpdate} options={options} />
            <Audioplayer currentSurah={currentSurah} lazyLoadAyahs={lazyLoadAyahs} />
            <ContentDropdown handleOptionUpdate={handleOptionUpdate} options={options} />
            <FontSizeDropdown />
            <ReadingModeToggle />
          </Nav>

          <Nav navbar right>
            <SearchInput isInNavbar />
          </Nav>
        </CollapsibleNav>
      </Navbar>
    );
  }
}
