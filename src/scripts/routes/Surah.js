import React from 'react';
import { handleRoute } from 'fluxible-router';
import SurahsNav from 'components/surah/SurahsNav';
import MasterHeader from 'components/header/MasterHeader';
import * as AyahsActions from 'actions/AyahsActions';
import * as SurahsActions from 'actions/SurahsActions';
import AyahsList from 'components/surah/AyahsList';
import $ from 'jquery';
import { connectToStores } from 'fluxible/addons';
import AyahsStore from 'stores/AyahsStore';
import SurahsStore from 'stores/SurahsStore';
import SearchInput from 'components/header/SearchInput';
import NavBrand from 'components/header/NavBrand';
import debug from 'utils/Debug';
import SurahInfo from 'components/surah/SurahInfo';

class Surah extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      endOfSurah: false,
      loading: false
    };
  }

  renderPagination() {
    var surahId = this.props.currentRoute.get('params').get('surahId');
    if (this.state.loading) {
        return <p>Loading...</p>;
    } else if (this.state.endOfSurah) {
        return <p>End of Surah</p>;
    } else {
      return (
        <ul className="pager">
            <li className="previous">
              <a href={surahId * 1 - 1}>
                  &larr; Previous Surah
              </a>
            </li>
            <li className="next">
              <a href={surahId * 1 + 1}>
                  Next Surah &rarr;
              </a>
            </li>
        </ul>
      );
    }
  }

  onScroll() {
    var self = this;
    if (typeof window === 'undefined') {
      return;
    }

    var range = this.props.currentRoute.get('params').get('range');
    if (range) {
      var rangeArray = range.split('-');
    }
    else {
      var rangeArray = [1,10];
    }

    $(window).unbind('scroll');
    $(window).bind('scroll', () => {
      var lastAyah, toAyah, sizeOfLoad, url;
      var nav = $('nav');
      var getAyahs = this.context.getStore('AyahsStore').getAyahs();

      if ($(document).scrollTop() > 100) {
        nav.addClass('shrink');
      }
      else {
        nav.removeClass('shrink');
      }

      if (!this.state.loading && window.pageYOffset > document.body.scrollHeight - window.innerHeight - 1000) {
        if (getAyahs.length && getAyahs.length !== this.context.getStore('SurahsStore').getSurah().ayat) {
          this.setState({loading: true});

          if ((rangeArray[1] - rangeArray[0] + 1) < 10) {
            sizeOfLoad = rangeArray[1] - rangeArray[0] + 1;
          }
          else {
            sizeOfLoad = 10;
          }

          lastAyah = this.context.getStore('AyahsStore').getLast() + 1;
          toAyah = (lastAyah + sizeOfLoad - 1);

          this.context.executeAction(AyahsActions.getAyahs, {
            surahId: this.props.currentRoute.get('params').get('surahId'),
            from: lastAyah,
            to: toAyah
          });
        }
        else {
          if (!this.state.endOfSurah) {
            this.setState({endOfSurah: true});
          }
        }
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.ayahs.length < nextProps.ayahs.length) {
      this.setState({loading: false});
      return true;
    };

    return false;
  }

  render() {
    debug('COMPONENT-SURAH');
    this.onScroll();

    return (
      <div className="surah-body">
        <div className="left-side">
          <NavBrand />
          <SearchInput className="col-md-12 search-input" />
          <SurahsNav className="hidden-xs"/>
        </div>
        <div className="right-side">
          <MasterHeader />
          <SurahInfo />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <AyahsList />
              </div>
              <div className="col-md-10 col-md-offset-1">
                {this.renderPagination()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Surah.displayName = 'Surah';

Surah.contextTypes = {
  executeAction: React.PropTypes.func.isRequired,
  getStore: React.PropTypes.func.isRequired
}

Surah = connectToStores(Surah, [AyahsStore], (stores, props) => {
  return {
    ayahs: stores.AyahsStore.getAyahs()
  }
});

Surah = handleRoute(Surah);

export default Surah;
