import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import DocumentMeta from 'react-document-meta';

import debug from 'helpers/debug';

import { clearCurrent, isLoaded, load as loadAyahs } from 'redux/modules/ayahs';
import { setCurrent as setCurrentSurah } from 'redux/modules/surahs';
import { setOption } from 'redux/modules/options';

import Ayah from 'components/Ayah';
import Line from 'components/Line';
import VersesDropdown from 'components/VersesDropdown';
import CoreLoader from 'components/CoreLoader';
import SurahNavBar from './SurahNavBar';

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
      isLoading: state.ayahs.isLoading,
      lines: state.lines.lines,
      options: state.options,
      isChangingSurah: state.surahs.current !== ownProps.params.surahId
    };
  },
  {
    loadAyahsDispatch: loadAyahs,
    setOptionDispatch: setOption,
    push
  }
)
export default class Surah extends Component {
  static propTypes = {
    ayahs: PropTypes.object,
    lines: PropTypes.array,
    isChangingSurah: PropTypes.bool,
    isEndOfSurah: PropTypes.bool,
    isLoading: PropTypes.bool,
    options: PropTypes.object,
    ayahKeys: PropTypes.array,
    ayahIds: PropTypes.array,
    surah: PropTypes.object,
    loadAyahsDispatch: PropTypes.func,
    setOptionDispatch: PropTypes.func,
    push: PropTypes.func,
    location: PropTypes.object
  };

  shouldComponentUpdate(nextProps) {
    const routingToSameComponent = !this.props.isChangingSurah && nextProps.isChangingSurah;
    const routingToSameComponentFinished = this.props.isChangingSurah && !nextProps.isChangingSurah;
    // const lazyLoadFinished = !routingToSameComponent && (!this.props.isLoaded && nextProps.isLoaded);
    const readingModeTriggered = this.props.options.isReadingMode !== nextProps.options.isReadingMode;

    return (
      routingToSameComponent ||
      routingToSameComponentFinished ||
      // lazyLoadFinished ||
      readingModeTriggered
    );
  }

  onVerseDropdownClick(ayahNum) {
    const { ayahIds, push, surah } = this.props; // eslint-disable-line no-shadow

    if (ayahNum > (ayahIds[ayahIds.length - 1] + 10)) {
      // This is beyond lazy loading next page.
      return push(`/${surah.id}/${ayahNum}-${ayahNum + 10}`);
    }

    this.lazyLoadAyahs();
  }

  static reduxAsyncConnect(params, store) {
    const { dispatch, getState } = store;
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

  handleOptionUpdate(payload) {
    const { setOptionDispatch, loadAyahsDispatch, surah, ayahIds, options } = this.props;
    const from = ayahIds[0];
    const to = ayahIds[ayahIds.length - 1];

    setOptionDispatch(payload);
    loadAyahsDispatch(surah.id, from, to, Object.assign({}, options, payload));
  }

  lazyLoadAyahs() {
    const { loadAyahsDispatch, ayahIds, surah, options } = this.props;

    const range = [
      ayahIds[0],
      ayahIds[ayahIds.length - 1]
    ];
    let size = 10;

    if ((range[1] - range[0] + 1) < 10) {
      size = range[1] - range[0] + 1;
    }

    const from = range[1];
    const to = (from + size);

    if (!ayahIds.includes(to)) {
      loadAyahsDispatch(surah.id, from, to, options);
    }
  }

  initScroll() {
    if (__CLIENT__) {
      const onScroll = () => {
        const { isLoading, isEndOfSurah } = this.props;

        if (isEndOfSurah) {
          return false;
        }

        if (!isLoading && window.pageYOffset > (document.body.scrollHeight - window.innerHeight - 1000)) {
          // Reached the end.
          // this.lazyLoadAyahs();
          console.log('LAZYLOAD');
        }
      };

      window.removeEventListener('scroll', onScroll.bind(this), false);
      window.addEventListener('scroll', onScroll.bind(this), false);
    }
  }

  renderAyahs() {
    const { ayahKeys, ayahs, isChangingSurah } = this.props;

    if (isChangingSurah) {
      return (
        <div style={{paddingTop: '15%'}}>
          <CoreLoader minHeight={125}>Loading...</CoreLoader>
        </div>
      );
    }

    return ayahKeys.map(key => (
      <Ayah ayah={ayahs[key]} key={key} />
    ));
  }

  renderLines() {
    const { lines } = this.props;

    return lines.map((line, index) => <Line line={line} key={index} />);
  }

  renderFooter() {
    const { isLoading, isEndOfSurah, isChangingSurah, surah } = this.props;

    const adjacentSurahs = (
      <ul className="pager">
        {surah.id > 1 ?
          <li className="previous">
            <Link to={`/${surah.id * 1 - 1}`}>
              &larr; Previous Surah
            </Link>
          </li>
          : null
        }
        {surah.id < 114 ?
          <li className="next">
            <Link to={`/${surah.id * 1 + 1}`}>
              Next Surah &rarr;
            </Link>
          </li>
          : null}
      </ul>
    );

    return (
      <Row>
        <Col xs={12} className="text-center">
          {isLoading && !isChangingSurah ? <CoreLoader/> : null}
          {isEndOfSurah ? adjacentSurahs : null}
        </Col>
      </Row>
    );
  }

  render() {
    debug('component:Surah', 'Render');

    const { surah, ayahIds, options } = this.props; // eslint-disable-line no-shadow

    this.initScroll();

    return (
      <div>
        <DocumentMeta title={`${surah.name.simple} - The Noble Qur'an - القرآن الكريم`} extend />
        <SurahNavBar
          surah={surah}
          handleOptionUpdate={this.handleOptionUpdate.bind(this)}
          lazyLoadAyahs={this.lazyLoadAyahs.bind(this)}
          options={options}
        >
          <VersesDropdown ayat={surah.ayat} loaded={ayahIds} onClick={this.onVerseDropdownClick.bind(this)}/>
        </SurahNavBar>
        <Grid style={{paddingTop: 150}}>
          {surah && surah.bismillahPre ?
            <div className="bismillah text-center">
              ﭑﭒﭓ
            </div>
            : null
          }
          {options.isReadingMode ? this.renderLines() : this.renderAyahs()}
          {this.renderFooter()}
        </Grid>
      </div>
    );
  }
}
