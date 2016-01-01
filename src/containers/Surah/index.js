import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';

import connectData from 'helpers/connectData';

import { isLoaded, load as loadAyahs } from 'redux/modules/ayahs';
import { setCurrent as setCurrentSurah } from 'redux/modules/surahs';
import { setOption } from 'redux/modules/options';

import Ayah from 'components/Ayah';
import Line from 'components/Line';
import CoreLoader from 'components/CoreLoader';
import SurahNavBar from './SurahNavBar';

function fetchData(getState, dispatch, location, params) {
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

    dispatch(setCurrentSurah(params.surahId));

    return dispatch(loadAyahs(params.surahId, from, to, options));
  }
}

@connectData(fetchData, null)
@connect(
  state => ({
    surahs: state.surahs.entities,
    ayahs: state.ayahs.entities,
    lines: state.lines.lines,
    options: state.options,
    isLoaded: state.ayahs.loaded,
    isLoading: state.ayahs.loading,
    currentSurah: state.surahs.entities[state.surahs.current],
  }),
  {
    loadAyahsDispatch: loadAyahs,
    setOptionDispatch: setOption
  },
  (stateProps, dispatchProps, ownProps) => {
    const ayahKeys = Object.keys(stateProps.ayahs[ownProps.params.surahId]);
    const ayahIds = ayahKeys.map(key => parseInt(key.split(':')[1], 10));
    const ayahs = stateProps.ayahs[ownProps.params.surahId];

    return {
      ...stateProps, ...dispatchProps, ...ownProps,
      ayahs,
      ayahKeys,
      ayahIds
    };
  }
)
export default class Surah extends Component {
  static propTypes = {
    ayahs: PropTypes.object,
    lines: PropTypes.array,
    isLoaded: PropTypes.bool,
    isLoading: PropTypes.bool,
    options: PropTypes.object,
    ayahKeys: PropTypes.array,
    ayahIds: PropTypes.array,
    currentSurah: PropTypes.object,
    loadAyahsDispatch: PropTypes.func,
    setOptionDispatch: PropTypes.func
  }

  shouldComponentUpdate(nextProps) {
    return (
      (nextProps.isLoaded) ||
      (this.props.options.isReadingMode !== nextProps.options.isReadingMode)
    );
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
        const { currentSurah, ayahIds, isLoading } = this.props;

        if (ayahIds.length === currentSurah.ayat) {
          // End of surah.
          this.setState({
            endOfSurah: true
          });
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

  handleOptionUpdate(payload) {
    const { setOptionDispatch, loadAyahsDispatch, currentSurah, ayahIds, options } = this.props;
    const from = ayahIds[0];
    const to = ayahIds[ayahIds.length - 1];

    setOptionDispatch(payload);
    loadAyahsDispatch(currentSurah.id, from, to, Object.assign({}, options, payload));
  }

  renderAyahs() {
    const { ayahKeys, ayahs } = this.props;

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
    const { isLoading } = this.props;

    return (
      <Row>
        <Col xs={6} xsOffset={3} className="footer">
          {isLoading ? <CoreLoader/> : null}
        </Col>
      </Row>
    );
  }

  render() {
    const { currentSurah, options: { isReadingMode } } = this.props;

    this.initScroll();

    return (
      <div>
        <DocumentMeta title={`${currentSurah.name.simple} - The Noble Qur'an - القرآن الكريم`} extend />
        <SurahNavBar
          currentSurah={currentSurah}
          handleOptionUpdate={this.handleOptionUpdate.bind(this)}
          lazyLoadAyahs={this.lazyLoadAyahs.bind(this)} />
        <Grid style={{paddingTop: 150}}>
          {isReadingMode ? this.renderLines() : this.renderAyahs()}
          {this.renderFooter()}
        </Grid>
      </div>
    );
  }
}
