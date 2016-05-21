import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Helmet from 'react-helmet';

// components
import LazyLoad from '../../components/LazyLoad';
import PageBreak from '../../components/PageBreak';
import Audioplayer from '../../components/Audioplayer';
import ContentDropdown from '../../components/ContentDropdown';
import ReciterDropdown from '../../components/ReciterDropdown';
import SurahsDropdown from '../../components/SurahsDropdown';
import VersesDropdown from '../../components/VersesDropdown';
import FontSizeDropdown from '../../components/FontSizeDropdown';
import InformationToggle from '../../components/InformationToggle';
import SurahInfo from '../../components/SurahInfo';
import MasterHeader from 'components/header/MasterHeader';
import ReadingModeToggle from 'components/header/ReadingModeToggle';
import Ayah from '../../components/Ayah';
import Line from '../../components/Line';
import SearchInput from 'components/header/SearchInput';
import Bismillah from '../../components/Bismillah';
import scroller from '../../scripts/utils/scroller';

// Helpers
import makeHeadTags from '../../helpers/makeHeadTags';

const style = require('./style.scss');

import debug, { error } from '../../helpers/debug';


import { clearCurrent, isLoaded, load as loadAyahs, setCurrentAyah, setCurrentWord, clearCurrentWord } from '../../redux/modules/ayahs';
import { isAllLoaded, loadAll, setCurrent as setCurrentSurah } from '../../redux/modules/surahs';
import { setOption, toggleReadingMode } from '../../redux/modules/options';

let lastScroll = 0;
const ayahRangeSize = 30;
function sleepFor( sleepDuration ){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
let _debug = debug('container:Surah:promise');
_debug.log = console.debug? console.debug.bind(console) : console.info? console.info.bind(console) : console.log.bind(console);
_debug.error = console.error.bind(console);

@asyncConnect([
  {
    promise: ({ store: { getState, dispatch }, params }) => { // this is much less confusing then the old line 'promise({ store: { getState, dispatch }, params }) {'-- it looks like a method call even though it's a method definition, misleading trickery
      const { range, surahId } = params;
      const { options } = getState();
      _debug.log('first promise start');
      /*sleepFor(2000);
      return dispatch(loadAyahs(surahId, 1, 2, options)).then((a,b,c) => {
        _debug.log('first promise end');
      }, (err) => {
        _debug.error('first promise end');
      });*/

      const p = () => {

        let from;
        let to;
        const loader = () => {
          if (!isLoaded(getState(), surahId, from, to)) {
            _debug('loading initial ayahs');
            dispatch(clearCurrent(surahId)); // In the case where you go to same surah but later ayahs.

            return dispatch(loadAyahs(surahId, from, to, options));
          }
          else {
            _debug('isLoaded apparently, so not dispatching loadAyahs');
          }
        };

        return Promise.resolve('chain')
        .then(function() {
          if (isNaN(surahId)) {
            // Should have an alert or something to tell user there is an error.
            _debug('isNaN surahId');
            return dispatch(push('/'))
          }
        })
        .then((args) => {
          _debug('then', { args, surahId, from, to, currentSurahId: getState().surahs.current });

          if (params.surahId !== getState().surahs.current) {
            return dispatch(setCurrentSurah(surahId));
          }
        })
        .then((args) => {
          _debug('then #2', { args, surahId, from, to, currentSurahId: getState().surahs.current });

          if (!isAllLoaded(getState())) {
            _debug.log('dispatching all');
            return dispatch(loadAll());
          }
        })
        .then(() => {
          // do ayah promise
          _debug.log('dispatch loadAll success', { success: isAllLoaded(getState()) });

          //console.log('second promise', { params, state: getState() });
          if (range) {
            if (range.includes('-')) {
              [from, to] = range.split('-');
            } else {
              // Single ayah. For example /2/30
              from = range;
              to = parseInt(range, 10) + ayahRangeSize;
            }

            if (isNaN(from) || isNaN(to)) {
              // Something wrong happened like /2/SOMETHING
              // going to rescue by giving beginning of surah.
              [from, to] = [1, ayahRangeSize];
            }
          } else {
            [from, to] = [1, ayahRangeSize];
          }

          //_debug.log('state is', {state:getState() } );

          _debug.log('from / to before min call', { from, to });
          try {
          const state = getState();
          from = Math.min(from, state && state.surahs && state.surahs.entities && state.surahs.entities[surahId] && state.surahs.entities[surahId].ayat ? state.surahs.entities[surahId].ayat : 5);
            to = Math.min(to,   getState().surahs.entities[surahId].ayat);
          } catch(e) {
            console.error('console.error', e);
            _debug.error('_debug.error', e);
          }
          _debug.log('from / to after min call', { from, to });
        })
        .then(loader)
        .catch((err) => {
          _debug.error('oops', err);
          return loader();
        })
        .then(loader)
        .then(loader)
        .then(loader)
      };

      return p()
      .then(function(args) {
        _debug.log('first promise end', args);
      }).catch(function(err) {
        _debug.error('first promise end', err);
      });

      /*

      _debug.log('first promise', params);
      if (!isAllLoaded(getState())) {
        _debug.log('dispatching all');
        return dispatch(loadAll())
        .then(() => {
          let _promise;
          // do ayah promise
          _debug.log('dispatch loadAll success', { success: isAllLoaded(getState()) });

          //console.log('second promise', { params, state: getState() });
          let from;
          let to;

          if (range) {
            if (range.includes('-')) {
              [from, to] = range.split('-');
            } else {
              // Single ayah. For example /2/30
              from = range;
              to = parseInt(range, 10) + ayahRangeSize;
            }

            if (isNaN(from) || isNaN(to)) {
              // Something wrong happened like /2/SOMETHING
              // going to rescue by giving beginning of surah.
              [from, to] = [1, ayahRangeSize];
            }
          } else {
            [from, to] = [1, ayahRangeSize];
          }

          //_debug.log('state is', {state:getState() } );

          _debug.log('from / to before min call', { from, to });
          try {
          const state = getState();
          from = Math.min(from, state && state.surahs && state.surahs.entities && state.surahs.entities[surahId] && state.surahs.entities[surahId].ayat ? state.surahs.entities[surahId].ayat : 5);
            to = Math.min(to,   getState().surahs.entities[surahId].ayat);
          } catch(e) {
            console.error('console.error', e);
            _debug.error('_debug.error', e);
          }
          _debug.log('from / to after min call', { from, to });

          if (!isLoaded(getState(), surahId, from, to)) {
            _debug('loading initial ayahs');
            dispatch(clearCurrent(surahId)); // In the case where you go to same surah but later ayahs.

            _promise = dispatch(loadAyahs(surahId, from, to, options));
          }
          else {
            _debug('isLoaded apparently, so not dispatching loadAyahs');
          }

          return true;






        }, (args) => {
          _debug.log('going to try debug.eror');
          _debug.error(...(typeof(args) === 'string'? [args] : typeof(args) === 'undefined'? [] : args));
        });
      }

      console.log('returning true');
      return true;
    }
    */
  }/*,
  {
    promise({ store: { dispatch, getState }, params }) {
      const { range, surahId } = params;
      const { options } = getState();

      _debug.log('second promise start');
      sleepFor(1000);
      return dispatch(loadAyahs(surahId, 1, 2, options)).then((a,b,c) => {
        _debug.log('second promise end');
        _debug.log('second promise THEN THEN THEN', { a,b,c });
      }, (err) => {
        _debug.log('second promise end');
        _debug.log('second promise ERROR ERROR ERROR', { err });
      });


      let from;
      let to;

      if (range) {
        if (range.includes('-')) {
          [from, to] = range.split('-');
        } else {
          // Single ayah. For example /2/30
          from = range;
          to = parseInt(range, 10) + ayahRangeSize;
        }

        if (isNaN(from) || isNaN(to)) {
          // Something wrong happened like /2/SOMETHING
          // going to rescue by giving beginning of surah.
          [from, to] = [1, ayahRangeSize];
        }
      } else {
        [from, to] = [1, ayahRangeSize];
      }

      //from = Math.min(from, getState().surahs.entities[surahId].ayat); // can't get to this from here because the surahs.entities object is empty when this runs on account of parallel async promises running
      //  to = Math.min(to,   getState().surahs.entities[surahId].ayat);

      if (isNaN(surahId)) {
        // Should have an alert or something to tell user there is an error.
        _debug('isNaN surahId');
        return dispatch(push('/'));
      }
      else {
        _debug({ surahId, from, to, currentSurahId: getState().surahs.current });
      }

      if (params.surahId !== getState().surahs.current) {
        dispatch(setCurrentSurah(surahId));
      }

      if (!isLoaded(getState(), surahId, from, to)) {
        _debug('loading initial ayahs');
        dispatch(clearCurrent(surahId)); // In the case where you go to same surah but later ayahs.

        return dispatch(loadAyahs(surahId, from, to, options)).then((a,b,c) => {
          _debug.log('THEN THEN THEN', { a,b,c });
        });
      }
      else {
        _debug('isLoaded apparently, so not dispatching loadAyahs');
      }

      return true;
    }*/
  }
])
@connect(
  (state, ownProps) => {
    const surah: Object = state.surahs.entities[ownProps.params.surahId];
    const ayahs: Object = state.ayahs.entities[ownProps.params.surahId];
    const ayahIds = new Set(Object.keys(ayahs).map(key => parseInt(key.split(':')[1], 10)));
    ayahIds.first = function() {return [...this][0];};
    ayahIds.last = function() {return [...this][[...this].length - 1];};

    const isEndOfSurah = ayahIds.last() === surah.ayat;
    const currentWord = state.ayahs.currentWord;
    const isPlaying = state.audioplayer.isPlaying;

    return {
      isPlaying,
      currentWord,
      surah,
      ayahs,
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
    setCurrentAyah: setCurrentAyah,
    setCurrentWord: setCurrentWord,
    clearCurrentWord: clearCurrentWord,
    push
  }
)
export default class Surah extends Component {
  constructor() {
    super(...arguments);
    this.debug = debug('container:Surah');
    this.error = error('container:Surah');
    this.debug.log('constructor');
  }

  state = {
    lazyLoading: false
  };

  componentDidMount() {
    if (__CLIENT__) {
      window.__debug_surah = this;
      window.removeEventListener('scroll', this.handleNavbar, true);
      window.addEventListener('scroll', this.handleNavbar, true);
      lastScroll = window.pageYOffset;
    }
  }

//<<<<<<< HEAD
//=======
  // TODO lets try this with and without this function, but shouldComponentUpdate is the additional function from audio-segments in the merge conflict
  /*
  shouldComponentUpdate(nextProps) {
    const sameSurahIdRouting = this.props.params.surahId === nextProps.params.surahId;
    const lazyLoadFinished = sameSurahIdRouting && (!this.props.isLoaded && nextProps.isLoaded);
    const hasReadingModeChange = this.props.options.isReadingMode !== nextProps.options.isReadingMode;
    const hasFontSizeChange = this.props.options.fontSize !== nextProps.options.fontSize;
    const hasSurahInfoChange = this.props.options.isShowingSurahInfo !== nextProps.options.isShowingSurahInfo;
    const hasCurrentWordChange = this.props.currentWord !== nextProps.currentWord;

    return (
      !sameSurahIdRouting ||
      lazyLoadFinished ||
      hasReadingModeChange ||
      hasFontSizeChange ||
      hasSurahInfoChange ||
      hasCurrentWordChange
    );
  }
  */

//>>>>>>> audio-segments
  componentWillUnmount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.handleNavbar, true);
    }
  }

  title() {
    const { params, surah } = this.props;

    if (params.range) {
      return `Surah ${surah.name.simple} [${surah.id}:${params.range}]`;
    }

    return `${surah.id} Surah ${surah.name.simple}`;
  }

  description() {
    const { params, ayahs, surah } = this.props;

    if (params.range) {
      if (params.range.includes('-')) {
        const [from, to] = params.range.split('-').map(num => parseInt(num, 10));
        const array = Array(to - from).fill(from);
        const translations = array.map((fromAyah, index) => {
          const ayah = ayahs[`${surah.id}:${fromAyah + index}`];
          if (ayah && ayah.content && ayah.content[0]) {
            return ayah.content[0].text;
          }
        });
        const content = translations.join(' - ').slice(0, 250);

        return `Surat ${surah.name.simple} [verse ${params.range}] - ${content}`;
      } else {
        const ayah = ayahs[`${surah.id}:${params.range}`];
        if (ayah && ayah.content && ayah.content[0]) {
          return `Surat ${surah.name.simple} [verse ${params.range}] - ${ayah.content[0].text}`;
        } else {
          return `Surat ${surah.name.simple} [verse ${params.range}]`;
        }
      }
    }

    return null;
  }

  handleOptionChange(payload) {
    const { setOptionDispatch, loadAyahsDispatch, surah, ayahIds, options } = this.props;
    const from = ayahIds.first();
    const to = ayahIds.last();

    setOptionDispatch(payload);
    loadAyahsDispatch(surah.id, from, to, Object.assign({}, options, payload));
  }

  handleFontSizeChange = (payload) => {
    const { setOptionDispatch } = this.props;

    return setOptionDispatch(payload);
  }

  handleSurahInfoToggle = (payload) => {
    const { setOptionDispatch } = this.props;

    return setOptionDispatch(payload);
  }

  handleNavbar = () => {
    // TODO: This should be done with react!
    if (window.pageYOffset > lastScroll) {
      document.querySelector('nav').classList.add('scroll-up');
    } else {
      document.querySelector('nav').classList.remove('scroll-up');
    }

    lastScroll = window.pageYOffset;
  }

  handleVerseDropdownClick(ayahNum) {
    const { ayahIds, push, surah, setCurrentAyah } = this.props; // eslint-disable-line no-shadow

    setCurrentAyah(surah.id +':'+ ayahNum);

    if (ayahIds.has(ayahNum)) {
      return;
    }

    if (ayahNum > (ayahIds.last() + 10) || ayahNum < ayahIds.first()) {
      // This is beyond lazy loading next page.
      return push(`/${surah.id}/${ayahNum}-${ayahNum + 10}`);
    }

    this.lazyLoadAyahs(() => setTimeout(() => {
      scroller.scrollTo('ayah:'+ ayahNum);
    }, 1000)); // then scroll to it
  }


  lazyLoadAyahs(callback) {
    const { loadAyahsDispatch, ayahIds, surah, options } = this.props;

    const range = [ayahIds.first(), ayahIds.last()];
    let size = 10;

    if ((range[1] - range[0] + 1) < 10) {
      size = range[1] - range[0] + 1;
    }

    const from = range[1];
    const to = (from + size);

    if (!ayahIds.has(to)) {
      loadAyahsDispatch(surah.id, from, to, options).then(() => {
        this.setState({lazyLoading: false});
        if (callback) {
          callback();
        }
      });
    }
  }

  renderPagination() {
    const { isLoading, isEndOfSurah, surah } = this.props;

    return (
      <LazyLoad
        onLazyLoad={this.lazyLoadAyahs.bind(this)}
        isEnd={isEndOfSurah && !isLoading}
        isLoading={isLoading}
        endComponent={
          <ul className="pager">
            {
              surah.id > 1 &&
              <li className="previous">
                <Link to={`/${surah.id * 1 - 1}`}>
                  &larr; Previous Surah
                </Link>
              </li>
            }
            <li className="text-center">
              <Link to={`/${surah.id}`}>
                Beginning of Surah
              </Link>
            </li>
            {
              surah.id < 114 &&
              <li className="next">
                <Link to={`/${surah.id * 1 + 1}`}>
                  Next Surah &rarr;
                </Link>
              </li>
            }
          </ul>
        }
        loadingComponent={<p>Loading...</p>}
      />
    );
  }

  onWordClick(id) {
    const { setCurrentWord, clearCurrentWord, currentWord, isPlaying } = this.props;
    if (id == currentWord && !isPlaying) {
      clearCurrentWord();
    } else {
      setCurrentWord(id);
    }
  }

  onWordFocus(id, elem) {
    try {
      const { setCurrentWord, clearCurrentWord, currentWord, isPlaying } = this.props;
      if (id != currentWord && isPlaying) {
        setCurrentWord(id); // let tabbing around while playing trigger seek to word action
      }
      if (elem && elem.nextSibling && elem.nextSibling.classList.contains('tooltip')) { // forcefully removing tooltips
        elem.nextSibling.remove();                                                      // because our version of bootstrap does not respect the data-trigger option
      } else {
        const saved = elem.dataset.toggle;
        elem.dataset.toggle = '';
        setTimeout(function() {
          try {
            elem.dataset.toggle = saved;
          } catch(e) {
            console.info('caught in timeout',e);
          }
        }, 100);
      }
    } catch(e) {
      console.info('caught in onWordFocus',e);
    }
  }

  renderAyahs() {
    const { ayahs, currentWord } = this.props;

    return Object.values(ayahs).map(ayah => (
      <Ayah
        ayah={ayah}
        currentWord={currentWord && (new RegExp('^'+ ayah.ayahKey +':')).test(currentWord)? parseInt(currentWord.match(/\d+$/)[0], 10) : null}
        onWordClick={this.onWordClick.bind(this)}
        onWordFocus={this.onWordFocus.bind(this)}
        key={`${ayah.surahId}-${ayah.ayahNum}-ayah`}
      />
    ));
  }

  renderLines() {
    const { lines } = this.props;
    const keys = Object.keys(lines);

    return keys.map((lineNum, index) => {
      const nextNum = keys[index + 1];
      const pageNum = lineNum.split('-')[0];
      const line = lines[lineNum];

      if (index + 1 !== keys.length && pageNum !== nextNum.split('-')[0]) {
        return [
          <Line line={line} key={lineNum} />,
          <PageBreak pageNum={parseInt(pageNum, 10) + 1} />
        ];
      }

      return <Line line={line} key={lineNum} />;
    });
  }

  renderTopOptions() {
    const { toggleReadingModeDispatch, options } = this.props;

    return (
      <Row>
        <Col md={6} mdOffset={6} className="text-right">
          <ul className="list-inline">
            <li>
              <InformationToggle
                onToggle={this.handleSurahInfoToggle}
                isShowingSurahInfo={options.isShowingSurahInfo}
              />
            </li>
            <li>|</li>
            <li>
              <FontSizeDropdown
                options={options}
                onOptionChange={this.handleFontSizeChange}
              />
            </li>
            <li>|</li>
            <li>
              <ReadingModeToggle
                isToggled={options.isReadingMode}
                onReadingModeToggle={toggleReadingModeDispatch} />
            </li>
          </ul>
        </Col>
      </Row>
    );
  }

  render() {
    const { surah, surahs, ayahIds, options } = this.props;
    this.debug('render');
    this.debug.log('surah render');

    return (
      <div className="surah-body">
        <Helmet
          title={surah.name.simple}
          {...makeHeadTags({
            title: this.title(),
            description: this.description()
          })}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@id": "http://quran.com/",
                "name": "Quran"
              }
            },{
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@id": "http://quran.com/${surah.id}",
                "name": "${surah.name.simple}"
              }
            }]
          }`
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `.text-arabic{font-size: ${options.fontSize.arabic}rem;} .text-translation{font-size: ${options.fontSize.translation}rem;}`
          }}
        />
        <MasterHeader surah={surah}>
          <Row className="navbar-bottom">
            <Col md={8}>
              <Row>
                <SurahsDropdown
                  surahs={surahs}
                  className={`col-md-3 ${style.rightborder} ${style.dropdown}`}
                />
                <VersesDropdown
                  ayat={surah.ayat}
                  loadedAyahs={ayahIds}
                  isReadingMode={options.isReadingMode}
                  onClick={this.handleVerseDropdownClick.bind(this)}
                  className={`col-md-1 ${style.rightborder} ${style.dropdown}`}
                />
                <ReciterDropdown
                  onOptionChange={this.handleOptionChange.bind(this)}
                  options={options}
                  className={`col-md-2 ${style.rightborder} ${style.dropdown}`}
                />
                <Audioplayer
                  surah={surah}
                  onLoadAyahs={this.lazyLoadAyahs.bind(this)}
                  className={`col-md-4 ${style.rightborder}`}
                />
                <ContentDropdown
                  onOptionChange={this.handleOptionChange.bind(this)}
                  options={options}
                  className={`col-md-2 ${style.rightborder} ${style.dropdown}`}
                />
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <SearchInput
                  className={`col-md-12 search-input`}
                />
              </Row>
            </Col>
          </Row>
        </MasterHeader>
        <div className={`container-fluid ${style['surah-container']}`}>
          <Row>
            <SurahInfo
              surah={surah}
              isShowingSurahInfo={options.isShowingSurahInfo}
              onClose={this.handleSurahInfoToggle}
            />
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
