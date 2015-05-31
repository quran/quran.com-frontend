import React from 'react';
import {NavLink, handleRoute} from 'fluxible-router';
import SurahsStore from 'stores/SurahsStore';
import {connectToStores, provideContext} from 'fluxible/addons';
import DesktopOptions from 'components/header/DesktopOptions';
import MobileOptions from 'components/header/MobileOptions';
import debug from 'utils/Debug';

class MasterHeader extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false
    };
  }

  showOptions(e) {
    e.preventDefault();
    this.setState({showOptions: !this.state.showOptions});
  }

  previousChapter() {
    var prev = '/' + (parseInt(this.props.currentRoute.get('params').get('surahId')) - 1);
    return (
      <NavLink className="navbar-text previous-chapter" href={prev}>
        <i className="ss-icon ss-navigateleft"></i>
        <span className="hidden-xs">&nbsp;Previous Chapter</span>
      </NavLink>
    );
  }

  nextChapter() {
    var next = '/' + (parseInt(this.props.currentRoute.get('params').get('surahId')) + 1);
    return (
      <NavLink className="navbar-text next-chapter" href={next}>
        <span className="hidden-xs">Next Chapter&nbsp;</span>
        <i className="ss-icon ss-navigateright"></i>
      </NavLink>
    );
  }

  surahTitle(currentSurah) {
    function zeroPad(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
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
        <p className="navbar-text text-uppercase">
          {currentSurah.id}. {currentSurah.name.simple}&nbsp;
          ({currentSurah.name.english})
        </p>
      );
    }
  }

  renderMobileOptions() {
    if (this.state.showOptions) {
      return <MobileOptions />;
    }

    if (this.state.width < 1000) {
      return <MobileOptions />;
    }
  }

  renderDesktopOptions() {
    // if (this.state.width > 1000) {
      return <DesktopOptions />;
    // }
  }

  updateDimensions() {
    if (typeof window !== 'undefined') {
      this.setState({width: $(window).width(), height: $(window).height()});
    }
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", this.updateDimensions.bind(this));
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener("resize", this.updateDimensions);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.currentRoute.get('params').get('surahId') !==
            nextProps.currentRoute.get('params').get('surahId'));
  }

  render() {
    var currentSurah = this.context.getStore('SurahsStore')
      .getSurahs()[this.props.currentRoute.get('params').get('surahId') - 1]

    debug('Component-MasterHeader');
    return (
      <nav className="navbar navbar-default navbar-fixed-top montserrat" role="navigation">
        <div className="container-fluid">
          <div className="row">
            <NavLink className="col-md-2 col-xs-12 navbar-brand" href="/">
              <img src="/images/logo-md-w.png" alt="" className="logo" />
              <span className="title">THE NOBLE QURAN</span>
              <span className="menu visible-xs"
                    onClick={this.showOptions}>
                MENU <i className="ss-icon ss-dropdown"></i>
              </span>
            </NavLink>
            {this.renderMobileOptions()}
            <div className="col-md-3 col-xs-3 surah-title">
              <img src="/images/ornament-left.png" className="ornament" />
              {this.previousChapter()}
            </div>
            <div className="col-md-4 col-xs-6 surah-title text-center">
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
