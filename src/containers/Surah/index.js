import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import DocumentMeta from 'react-document-meta';

import connectData from 'helpers/connectData';
import debug from 'helpers/debug';

import { clearCurrent, isLoaded, load as loadAyahs } from 'redux/modules/ayahs';
import { setCurrent as setCurrentSurah } from 'redux/modules/surahs';
import { setOption } from 'redux/modules/options';

import Ayah from 'components/Ayah';
import Line from 'components/Line';
import VersesDropdown from 'components/VersesDropdown';
import CoreLoader from 'components/CoreLoader';
import SurahNavBar from './SurahNavBar';

function fetchData(getState, dispatch, location, params) {
  dispatch(setCurrentSurah(params.surahId));

  if (!isLoaded(getState())) {
    let from;
    let to;
    const { range } = params;
    const { options } = getState();

    if (range) {
      [from, to] = range.split('-');
    } else {
      [from, to] = [1, 10];
    }

    dispatch(clearCurrent(params.surahId)); // In the case where you go to same surah but later ayahs.
    return dispatch(loadAyahs(params.surahId, from, to, options));
  }
}

@connectData(fetchData, null)
@connect(
  (state, ownProps) => ({
    surahs: state.surahs.entities,
    ayahs: state.ayahs.entities,
    lines: state.lines.lines,
    options: state.options,
    isLoaded: state.ayahs.loaded,
    isLoading: state.ayahs.loading,
    isChangingSurah: state.surahs.current !== ownProps.params.surahId,
    currentSurah: state.surahs.entities[state.surahs.current],
    ayahKeys: []
  }),
  {
    loadAyahsDispatch: loadAyahs,
    setOptionDispatch: setOption,
    pushState
  },
  (stateProps, dispatchProps, ownProps) => {
    const ayahs = stateProps.ayahs[ownProps.params.surahId];
    const ayahKeys = Object.keys(ayahs);
    const ayahIds = ayahKeys.map(key => parseInt(key.split(':')[1], 10));
    const isEndOfSurah = ayahIds.length === stateProps.currentSurah.ayat;

    return {
      ...stateProps, ...dispatchProps, ...ownProps,
      ayahs,
      ayahKeys,
      ayahIds,
      isEndOfSurah
    };
  }
)
export default class Surah extends Component {
  static propTypes = {
    ayahs: PropTypes.object,
    lines: PropTypes.array,
    isLoaded: PropTypes.bool,
    isLoading: PropTypes.bool,
    isChangingSurah: PropTypes.bool,
    isEndOfSurah: PropTypes.bool,
    options: PropTypes.object,
    ayahKeys: PropTypes.array,
    ayahIds: PropTypes.array,
    currentSurah: PropTypes.object,
    loadAyahsDispatch: PropTypes.func,
    setOptionDispatch: PropTypes.func,
    pushState: PropTypes.func,
    location: PropTypes.object
  }

  shouldComponentUpdate(nextProps) {
    const routingToSameComponent = !this.props.isChangingSurah && nextProps.isChangingSurah;
    const routingToSameComponentFinished = this.props.isChangingSurah && !nextProps.isChangingSurah;
    const lazyLoadFinished = !routingToSameComponent && (!this.props.isLoaded && nextProps.isLoaded);
    const readingModeTriggered = this.props.options.isReadingMode !== nextProps.options.isReadingMode;

    return (
      routingToSameComponent ||
      routingToSameComponentFinished ||
      lazyLoadFinished ||
      readingModeTriggered
    );
  }

  onVerseDropdownClick(ayahNum) {
    const { ayahIds, pushState, currentSurah } = this.props; // eslint-disable-line no-shadow

    if (ayahNum > (ayahIds[ayahIds.length - 1] + 10)) {
      // This is beyond lazy loading next page.
      return pushState(null, `/${currentSurah.id}/${ayahNum}-${ayahNum + 10}`);
    }

    this.lazyLoadAyahs();
  }

  handleOptionUpdate(payload) {
    const { setOptionDispatch, loadAyahsDispatch, currentSurah, ayahIds, options } = this.props;
    const from = ayahIds[0];
    const to = ayahIds[ayahIds.length - 1];

    setOptionDispatch(payload);
    loadAyahsDispatch(currentSurah.id, from, to, Object.assign({}, options, payload));
  }

  lazyLoadAyahs() {
    const { loadAyahsDispatch, ayahIds, currentSurah, options } = this.props;

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
      loadAyahsDispatch(currentSurah.id, from, to, options);
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
          this.lazyLoadAyahs();
        }
      };

      window.removeEventListener('scroll', onScroll, false);
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

    return ayahKeys.map(key => {
      return (
        <Ayah ayah={ayahs[key]} key={key} />
      );
    });
  }

  renderLines() {
    const { lines } = this.props;

    return lines.map((line, index) => {
      return <Line line={line} key={index} />;
    });
  }

  renderFooter() {
    const { isLoading, isEndOfSurah, isChangingSurah, currentSurah } = this.props;

    const adjacentSurahs = (
      <ul className="pager">
        {currentSurah.id > 1 ?
          <li className="previous">
            <Link to={`/${currentSurah.id * 1 - 1}`}>
              &larr; Previous Surah
            </Link>
          </li>
          : null
        }
        {currentSurah.id < 114 ?
          <li className="next">
            <Link to={`/${currentSurah.id * 1 + 1}`}>
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
    const { currentSurah, ayahIds, options: { isReadingMode } } = this.props;

    this.initScroll();

    return (
      <div>
        <DocumentMeta title={`${currentSurah.name.simple} - The Noble Qur'an - القرآن الكريم`} extend />
        <SurahNavBar
          currentSurah={currentSurah}
          handleOptionUpdate={this.handleOptionUpdate.bind(this)}
          lazyLoadAyahs={this.lazyLoadAyahs.bind(this)}>
          <VersesDropdown ayat={currentSurah.ayat} loaded={ayahIds} onClick={this.onVerseDropdownClick.bind(this)}/>
        </SurahNavBar>
        <Grid style={{paddingTop: 150}}>
          {currentSurah && currentSurah.bismillahPre ?
            <div className="bismillah text-center">
              ﭑﭒﭓ
            </div>
            : null
          }
          {isReadingMode ? this.renderLines() : this.renderAyahs()}
          {this.renderFooter()}
        </Grid>
      </div>
    );
  }
}
