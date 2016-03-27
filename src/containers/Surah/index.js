import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Helmet from 'react-helmet';

// components
import SurahsNav from 'components/surah/SurahsNav';
import Audioplayer from '../../components/Audioplayer';
import ContentDropdown from '../../components/ContentDropdown';
import ReciterDropdown from '../../components/ReciterDropdown';
import SurahsDropdown from '../../components/SurahsDropdown';
import VersesDropdown from '../../components/VersesDropdown';
import FontSizeDropdown from '../../components/FontSizeDropdown';
import MasterHeader from 'components/header/MasterHeader';
import ReadingModeToggle from 'components/header/ReadingModeToggle';
import Ayah from 'components/surah/Ayah';
import Line from 'components/surah/Line';
import SearchInput from 'components/header/SearchInput';
import Bismillah from '../../components/Bismillah';

import debug from 'utils/Debug';

import { clearCurrent, isLoaded, load as loadAyahs } from '../../redux/modules/ayahs';
import { isAllLoaded, loadAll, setCurrent as setCurrentSurah } from '../../redux/modules/surahs';
import { setOption, toggleReadingMode } from '../../redux/modules/options';

let lastScroll = 0;

@asyncConnect([
  {
    promise({ store: { getState, dispatch } }) {
      if (!isAllLoaded(getState())) {
        return dispatch(loadAll());
      }

      return true;
    }
  },
  {
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

      return true;
    }
  }
])
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
      surahs: state.surahs.entities,
      isLoading: state.ayahs.loading,
      isLoaded: state.ayahs.loaded,
      lines: state.lines.lines,
      options: state.options,
    };
  },
  {
    loadAyahsDispatch: loadAyahs,
    setOptionDispatch: setOption,
    toggleReadingModeDispatch: toggleReadingMode,
    push
  }
)
export default class Surah extends Component {
  constructor() {
    super(...arguments);

    this.onScroll = this.onScroll.bind(this);
  }

  state = {
    lazyLoading: false
  };

  componentDidMount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.onScroll, true);
      window.addEventListener('scroll', this.onScroll, true);
      lastScroll = window.pageYOffset;
    }
  }

  shouldComponentUpdate(nextProps) {
    const sameSurahIdRouting = this.props.params.surahId === nextProps.params.surahId;
    const lazyLoadFinished = sameSurahIdRouting && (!this.props.isLoaded && nextProps.isLoaded);
    const readingModeTriggered = this.props.options.isReadingMode !== nextProps.options.isReadingMode;

    return (
      !sameSurahIdRouting ||
      lazyLoadFinished ||
      readingModeTriggered
    );
  }

  componentWillUnmount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.onScroll, true);
    }
  }

  renderPagination() {
    const { isEndOfSurah, surah } = this.props;
    const { lazyLoading } = this.state;

    if (isEndOfSurah && !lazyLoading) {
      return (
        <ul className="pager">
          {
            surah.id >= 114 &&
            <li className="previous">
              <Link to={`/${surah.id * 1 - 1}`}>
                &larr; Previous Surah
              </Link>
            </li>
          }
          {
            surah.id <= 1 &&
            <li className="next">
              <Link to={`/${surah.id * 1 + 1}`}>
                Next Surah &rarr;
              </Link>
            </li>
          }
        </ul>
      );
    }

    return <p>Loading...</p>;
  }

  handleOptionChange(payload) {
    const { setOptionDispatch, loadAyahsDispatch, surah, ayahIds, options } = this.props;
    const from = ayahIds[0];
    const to = ayahIds[ayahIds.length - 1];

    setOptionDispatch(payload);
    loadAyahsDispatch(surah.id, from, to, Object.assign({}, options, payload));
  }

  handleNavbar() {
    // TODO: This should be done with react!
    if (window.pageYOffset > lastScroll) {
      document.querySelector('nav').classList.add('scroll-up');
    } else {
      document.querySelector('nav').classList.remove('scroll-up');
    }

    lastScroll = window.pageYOffset;
  }

  handleVerseDropdownClick(ayahNum) {
    const { ayahIds, push, surah } = this.props; // eslint-disable-line no-shadow

    if (ayahNum > (ayahIds[ayahIds.length - 1] + 10)) {
      // This is beyond lazy loading next page.
      return push(`/${surah.id}/${ayahNum}-${ayahNum + 10}`);
    }

    this.lazyLoadAyahs();
  }

  onScroll() {
    const { isLoading, isEndOfSurah } = this.props;

    this.handleNavbar();

    if (isEndOfSurah) {
      return false;
    }

    if (!isLoading && !this.state.lazyLoading && window.pageYOffset > (document.body.scrollHeight - window.innerHeight - 1000)) {
      // Reached the end.
      this.setState({
        lazyLoading: true
      });

      this.lazyLoadAyahs();
    }
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
      loadAyahsDispatch(surah.id, from, to, options).then(() => this.setState({lazyLoading: false}));
    }
  }

  renderAyahs() {
    const { ayahs } = this.props;

    return Object.values(ayahs).map(ayah => (
      <Ayah
        ayah={ayah}
        key={`${ayah.surahId}-${ayah.ayahNum}-ayah`}
      />
    ));
  }

  renderLines() {
    const { lines } = this.props;

    return lines.map((line, index) => <Line line={line} key={index} />);
  }

  renderTopOptions() {
    const { toggleReadingModeDispatch, options } = this.props;

    return (
      <ul className="list-inline">
        <li>
          <FontSizeDropdown />
        </li>
        <li>
          <ReadingModeToggle
            isToggled={options.isReadingMode}
            onReadingModeToggle={toggleReadingModeDispatch} />
        </li>
        <li>
          {
            !options.isReadingMode &&
            <ContentDropdown
              onOptionChange={this.handleOptionChange.bind(this)}
              options={options}
            />
          }
        </li>
      </ul>
    );
  }

  render() {
    const { surah, surahs, ayahIds, options } = this.props;
    debug('component:Surah', 'Render');

    return (
      <div className="surah-body">
        <Helmet title={surah.name.simple} />
        <MasterHeader surah={surah}>
          <Row>
            <SurahsDropdown
              surahs={Object.values(surahs)}
              className="col-md-1"
            />
            <VersesDropdown
              ayat={surah.ayat}
              loaded={ayahIds}
              onClick={this.handleVerseDropdownClick.bind(this)}
              className="col-md-1"
            />
            <ReciterDropdown
              onOptionChange={this.handleOptionChange.bind(this)}
              options={options}
              className="col-md-1"
            />
            <Col md={3}>
              <Audioplayer surah={surah} onLoadAyahs={this.lazyLoadAyahs.bind(this)} />
            </Col>
          </Row>
        </MasterHeader>
        <div className="container-fluid">
          <Row>
            <Col md={10} mdOffset={1}>
              {this.renderTopOptions()}
              <Bismillah surah={surah} />
              {options.isReadingMode ? this.renderLines() : this.renderAyahs()}
            </Col>
            <Col md={10} mdOffset={1}>
              {this.renderPagination()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
