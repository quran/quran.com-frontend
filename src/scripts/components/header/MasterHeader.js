import React from 'react';
import {NavLink, handleRoute} from 'fluxible-router';
import SurahsStore from 'stores/SurahsStore';
import {connectToStores} from 'fluxible/addons';
import DesktopOptions from 'components/header/DesktopOptions';
import MobileOptions from 'components/header/MobileOptions';
import NavBrand from 'components/header/NavBrand';
import debug from 'utils/Debug';
import $ from 'jquery';

class MasterHeader extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false,
      showMobile: false,
      showDesktop: true
    };
  }

  showOptions(e) {
    e.preventDefault();
    this.setState({showOptions: !this.state.showOptions});
  }

  previousChapter() {
    var currentPos = parseInt(this.props.currentRoute.get('params').get('surahId'));
    var prev = '/' + (currentPos - 1);
    if (currentPos <= 1){
      return null;
    }
    else {
      return (
        <NavLink className="navbar-text previous-chapter" href={prev}>
          <i className="ss-icon ss-navigateleft"></i>
          <span className="hidden-xs"> PREVIOUS SURAH</span>
        </NavLink>
      );
    }
  }

  nextChapter() {
    var currentPos = parseInt(this.props.currentRoute.get('params').get('surahId'));
    var next = '/' + (currentPos + 1);
    if (currentPos >= 114){
      return null;
    }
    else {
      return (
        <NavLink className="navbar-text next-chapter" href={next}>
          <span className="hidden-xs">NEXT SURAH </span>
          <i className="ss-icon ss-navigateright"></i>
        </NavLink>
      );
    }
  }

  surahTitle(currentSurah) {
    function zeroPad(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join('0') + num;
    }

    if (currentSurah) {
      return (
        <img src={'/images/titles/' + zeroPad(currentSurah.id, 3) + '.svg'} className="title"/>
      );
    }
  }

  surahName(currentSurah) {
    if (currentSurah) {
      return (
        <p className="navbar-text text-uppercase surah-name">
          {currentSurah.name.simple} ({currentSurah.name.english})
        </p>
      );
    }
  }

  renderMobileOptions() {
    if (this.state.showOptions && this.state.showMobile) {
      return <MobileOptions />;
    }
  }

  renderDesktopOptions() {
    if (this.state.showDesktop) {
      return <DesktopOptions />;
    }
  }

  renderNavBrand() {
    return <NavBrand showOptions={this.state.showOptions}
                     showOptionsFn={this.showOptions.bind(this)} />;
  }

  updateDimensions() {
    if (typeof window !== 'undefined') {
      if ($(window).width() > 1000) {
        return;
        // this.setState({showDesktop: true, showMobile: false});
      }
      else {
        this.setState({showDesktop: false, showMobile: true});
      }
    }
  }

  componentDidMount() {
    this.updateDimensions();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateDimensions.bind(this));
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateDimensions.bind(this));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.currentRoute.get('params').get('surahId') !==
            nextProps.currentRoute.get('params').get('surahId')) {
      return true;
    }
    else if (this.state.showOptions !== nextState.showOptions) {
      return true;
    }
    else if (this.state.width !== nextState.width) {
      return true;
    }
    return false;
  }

  render() {
    var currentSurah = this.context.getStore('SurahsStore')
      .getSurahs()[this.props.currentRoute.get('params').get('surahId') - 1];

    debug('Component-MasterHeader');
    return (
      <nav className="navbar navbar-default navbar-fixed-top montserrat" role="navigation">
        <div className="container-fluid">
          <div className="row">
            {this.renderNavBrand()}
            {this.renderMobileOptions()}
            <div className="col-md-3 col-xs-3 surah-title">
              <img src="/images/ornament-left.png" className="ornament" />
              {this.previousChapter()}
            </div>
            <div className="col-md-6 col-xs-6 surah-title text-center">
              {this.surahTitle(currentSurah)}
              <br />
              {this.surahName(currentSurah)}
            </div>
            <div className="col-md-3 col-xs-3 surah-title text-right">
              {this.nextChapter()}
              <img src="/images/ornament-right.png" className="ornament" />
            </div>
          </div>
          {this.renderDesktopOptions()}
        </div>
      </nav>
    );
  }
}

MasterHeader.displayName = 'MasterHeader';

MasterHeader.contextTypes = {
  getStore: React.PropTypes.func.isRequired,
  executeAction: React.PropTypes.func.isRequired
};

MasterHeader = handleRoute(MasterHeader);

export default MasterHeader;
