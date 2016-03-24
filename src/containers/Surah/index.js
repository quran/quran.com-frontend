import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import $ from 'jquery';

// components
import SurahsNav from 'components/surah/SurahsNav';
import MasterHeader from 'components/header/MasterHeader';
import Ayah from 'components/surah/Ayah';
import SearchInput from 'components/header/SearchInput';
import NavBrand from 'components/header/NavBrand';
import debug from 'utils/Debug';

import { clearCurrent, isLoaded, load as loadAyahs } from '../../redux/modules/ayahs';
import { setCurrent as setCurrentSurah } from '../../redux/modules/surahs';
import { setOption } from '../../redux/modules/options';

@asyncConnect([{
  promise({ store: { dispatch, getState }, params }) {
    const { range, surahId } = params;
    const { options } = getState();
    let from;
    let to;

    if (range) {
      [from, to] = range.split('-');
    } else {
      [from, to] = [1, 10];
    }

    dispatch(setCurrentSurah(surahId));

    if (!isLoaded(getState(), surahId, from, to)) {
      dispatch(clearCurrent(surahId)); // In the case where you go to same surah but later ayahs.

      return dispatch(loadAyahs(surahId, from, to, options));
    }
  }
}])
@connect(
  (state, ownProps) => {
    const surah = state.surahs.entities[ownProps.params.surahId];
    const ayahs = state.ayahs.entities[ownProps.params.surahId];
    const ayahKeys = Object.keys(ayahs);
    const ayahIds = ayahKeys.map(key => parseInt(key.split(':')[1], 10));
    const isEndOfSurah = ayahIds.length === surah.ayat;

    return {
      surah,
      ayahs,
      ayahKeys,
      isEndOfSurah,
      ayahIds,
      isLoading: state.ayahs.loading,
      isLoaded: state.ayahs.loaded,
      lines: state.lines.lines,
      options: state.options,
    };
  },
  {
    loadAyahsDispatch: loadAyahs,
    setOptionDispatch: setOption,
    push
  }
)
export default class Surah extends Component {
  state = {
    endOfSurah: false,
    loading: false
  };

  renderPagination() {
    // if (this.state.endOfSurah && !this.state.loading) {
    //   if(surahId >= 114){
    //     return (
    //       <ul className="pager">
    //         <li className="previous">
    //           <Link to={`/${surahId * 1 - 1}`}>
    //             &larr; Previous Surah
    //           </Link>
    //         </li>
    //       </ul>
    //     );
    //   }
    //   else if (surahId <= 1){
    //     return (
    //       <ul className="pager">
    //         <li className="next">
    //           <Link to={`/${surahId * 1 + 1}`}>
    //             Next Surah &rarr;
    //           </Link>
    //         </li>
    //       </ul>
    //     );
    //   }
    //   else {
    //     return (
    //       <ul className="pager">
    //         <li className="previous">
    //           <Link to={`/${surahId * 1 - 1}`}>
    //             &larr; Previous Surah
    //           </Link>
    //         </li>
    //         <li className="next">
    //           <Link to={`/${surahId * 1 + 1}`}>
    //             Next Surah &rarr;
    //           </Link>
    //         </li>
    //       </ul>
    //     );
    //   }
    // }
    //

    return <p>Loading...</p>;
  }

  renderBismillah() {
    const { surah } = this.props;

    if (surah && surah.bismillahPre) {
      return (
        <div className="bismillah text-center word-font">
          ﭑﭒﭓ
        </div>
      )
    }
  }

  loadMoreFromButton(direction, e) {
    // let currentAyah = this.context.getStore('AyahsStore').getFirst(),
    //   toAyah = (direction === 'after') ? currentAyah + 10 : currentAyah,
    //   surahId = this.props.currentRoute.get('params').get('surahId');
    //
    // if (direction === 'before') {
    //   currentAyah = (currentAyah <= 10) ? 1 : currentAyah - 10;
    // }
    //
    // e.preventDefault();
    //
    // this.context.executeAction(AyahsActions.getAyahs, {
    //   surahId: surahId,
    //   from: currentAyah,
    //   to: toAyah
    // });
  }

  renderLoadMore(direction) {
    // let currentAyah = this.context.getStore('AyahsStore').getFirst(),
    //   lastAyahInSurah = this.context.getStore('SurahsStore').getSurah().ayat;
    //
    // if (this.context.getStore('AyahsStore').isSingleAyah()) {
    //
    //   if(direction === 'before' && currentAyah === 1 || direction === 'after' && currentAyah === lastAyahInSurah) {
    //     return;
    //   }
    //
    //   return (
    //     <div className="text-center padding" style={{margin: '5% 0%'}}>
    //       <a href="#" onClick={this.loadMoreFromButton.bind(this, direction)}>
    //       Load more</a>
    //     </div>
    //   )
    // }
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

  componentDidUpdate() {
    debug('component:Surah', 'componentDidUpdate');
  }

  shouldComponentUpdate(nextProps, nextState) {
    debug('component:Surah', 'shouldComponentUpdate');
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
    const { surah, ayahs } = this.props;
    debug('component:Surah', 'Render');

    return (
      <div className="surah-body">
        <Helmet title={surah.name.simple} />
        <div>
          {/*<MasterHeader />*/}
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                {this.renderBismillah()}
                {this.renderLoadMore('before')}
                {
                  Object.values(ayahs).map(ayah => (
                    <Ayah
                      ayah={ayah}
                      key={`${ayah.surahId}-${ayah.ayahNum}-ayah`}
                    />
                  ))
                }
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
