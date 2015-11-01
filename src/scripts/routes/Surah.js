import React from 'react';
import { handleRoute, NavLink } from 'fluxible-router';
import SurahsNav from 'components/surah/SurahsNav';
import MasterHeader from 'components/header/MasterHeader';
import * as AyahsActions from 'actions/AyahsActions';
import * as SurahsActions from 'actions/SurahsActions';
import {navigateAction} from 'fluxible-router';
import AyahsList from 'components/surah/AyahsList';
import $ from 'jquery';
import connectToStores from 'fluxible-addons-react/connectToStores';
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
    const surahId = this.props.currentRoute.get('params').get('surahId');

    if (this.state.endOfSurah && !this.state.loading) {
      if(surahId >= 114){
        return (
          <ul className="pager">
            <li className="previous">
              <NavLink href={`/${surahId * 1 - 1}`}>
                &larr; Previous Surah
              </NavLink>
            </li>
          </ul>
        );
      }
      else if (surahId <= 1){
        return (
          <ul className="pager">
            <li className="next">
              <NavLink href={`/${surahId * 1 + 1}`}>
                Next Surah &rarr;
              </NavLink>
            </li>
          </ul>
        );
      }
      else {
        return (
          <ul className="pager">
            <li className="previous">
              <NavLink href={`/${surahId * 1 - 1}`}>
                &larr; Previous Surah
              </NavLink>
            </li>
            <li className="next">
              <NavLink href={`/${surahId * 1 + 1}`}>
                Next Surah &rarr;
              </NavLink>
            </li>
          </ul>
        );
      }
    }

    if (this.context.getStore('AyahsStore').isSingleAyah()) {
      return false;
    }

    return <p>Loading...</p>;
  }

  renderBismillah() {
    const surah = this.context.getStore('SurahsStore').getSurah();

    if (surah && surah.bismillah_pre) {
      return (
        <div className="bismillah text-center word-font">
          ﭑﭒﭓ
        </div>
      )
    }
  }

  loadMoreFromButton(direction, e) {
    let currentAyah = this.context.getStore('AyahsStore').getFirst(),
      toAyah = (direction === 'after') ? currentAyah + 10 : currentAyah,
      surahId = this.props.currentRoute.get('params').get('surahId');

    if (direction === 'before') {
      currentAyah = (currentAyah <= 10) ? 1 : currentAyah - 10;
    }

    e.preventDefault();

    this.context.executeAction(AyahsActions.getAyahs, {
      surahId: surahId,
      from: currentAyah,
      to: toAyah
    });
  }

  renderLoadMore(direction) {
    let currentAyah = this.context.getStore('AyahsStore').getFirst(),
      lastAyahInSurah = this.context.getStore('SurahsStore').getSurah().ayat;

    if (this.context.getStore('AyahsStore').isSingleAyah()) {

      if(direction === 'before' && currentAyah === 1 || direction === 'after' && currentAyah === lastAyahInSurah) {
        return;
      }

      return (
        <div className="text-center padding" style={{margin: '5% 0%'}}>
          <a href="#" onClick={this.loadMoreFromButton.bind(this, direction)}>
          Load more</a>
        </div>
      )
    }
  }

  onScroll() {
    if (typeof window === 'undefined') {
      return;
    }

    var rangeArray;
    var range = this.props.currentRoute.get('params').get('range');

    if (range) {
      rangeArray = range.split('-');
    }
    else {
      rangeArray = [1, 10];
    }

    $(window).unbind('scroll');
    $(window).bind('scroll', () => {
      var lastAyah, toAyah, sizeOfLoad, url;
      const nav = $('nav, .left-side');
      const getAyahs = this.context.getStore('AyahsStore').getAyahs();

      if (getAyahs.length && getAyahs.length === this.context.getStore('SurahsStore').getSurah().ayat) {
        this.setState({
          endOfSurah: true,
          loading: false
        });
      }

      if (this.context.getStore('AyahsStore').isSingleAyah()) {
        return $(window).unbind('scroll');
      }

      if (!this.state.loading && window.pageYOffset > (document.body.scrollHeight - window.innerHeight - 1000)) {
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
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.ayahs.length < nextProps.ayahs.length) {
      this.setState({loading: false, endOfSurah: false});
      return true;
    }

    if (this.state.endOfSurah !== nextState.endOfSurah) {
      return true;
    }

    return false;
  }

  render() {
    debug('COMPONENT-SURAH');
    this.onScroll();

    return (
      <div className="surah-body">
        <div className="left-side shrink">
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
                {this.renderBismillah()}
                {this.renderLoadMore('before')}
                <AyahsList />
                {this.renderLoadMore('after')}
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
};

Surah = connectToStores(Surah, [AyahsStore], (context, props) => {
  const ayahsStore = context.getStore(AyahsStore);
  return {
    ayahs: ayahsStore.getAyahs()
  };
});

Surah = handleRoute(Surah);

export default Surah;
