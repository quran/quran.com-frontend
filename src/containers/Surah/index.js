import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';

// bootstrap
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Helmet from 'react-helmet';

// components
import LazyLoad from 'components/LazyLoad';
import PageBreak from 'components/PageBreak';
import Audioplayer from 'components/Audioplayer';
import ContentDropdown from 'components/ContentDropdown';
import ReciterDropdown from 'components/ReciterDropdown';
import SurahsDropdown from 'components/SurahsDropdown';
import VersesDropdown from 'components/VersesDropdown';
import FontSizeDropdown from 'components/FontSizeDropdown';
import TooltipDropdown from 'components/TooltipDropdown';
import InformationToggle from 'components/InformationToggle';
import SurahInfo from 'components/SurahInfo';
import Header from './Header';
import ReadingModeToggle from 'components/ReadingModeToggle';
import Ayah from 'components/Ayah';
import Line from 'components/Line';
import SearchInput from 'components/SearchInput';
import Bismillah from 'components/Bismillah';
import Share from 'components/Share';

// utils
import scroller from 'utils/scroller';

// Helpers
import makeHeadTags from 'helpers/makeHeadTags';
import debug from 'helpers/debug';

import descriptions from './descriptions';

import { surahsConnect, ayahsConnect } from './connect';

import * as AudioActions from '../../redux/modules/audioplayer';
import * as AyahActions from '../../redux/modules/ayahs';
import * as OptionsActions from '../../redux/modules/options';

const style = require('./style.scss');

let lastScroll = 0;

class Surah extends Component {
  static propTypes = {
    surah: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    lines: PropTypes.object.isRequired,
    isEndOfSurah: PropTypes.bool.isRequired,
    ayahIds: PropTypes.any,
    currentWord: PropTypes.string,
    surahs: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    options: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    ayahs: PropTypes.object.isRequired,
    isStarted: PropTypes.bool
  };

  state = {
    lazyLoading: false
  };

  componentWillMount() {
    const { params, surah, actions } = this.props; // eslint-disable-line no-shadow

    if (params.range && params.range.includes('-')) {
      const start = parseInt(params.range.split('-')[0], 10);

      if (start > surah.ayat || isNaN(start)) {
        return actions.push.push('/error/invalid-ayah-range');
      }

      return false;
    }

    return false;
  }

  componentDidMount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.handleNavbar, true);
      window.addEventListener('scroll', this.handleNavbar, true);
      lastScroll = window.pageYOffset;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const conditions = [
      this.state.lazyLoading !== nextState.lazyLoading,
      this.props.surah !== nextProps.surah,
      this.props.isEndOfSurah !== nextProps.isEndOfSurah,
      this.props.ayahIds.length !== nextProps.ayahIds.length,
      this.props.surahs !== nextProps.surahs,
      this.props.isLoading !== nextProps.isLoading,
      this.props.isLoaded !== nextProps.isLoaded,
      this.props.options !== nextProps.options
    ];

    return conditions.some(condition => condition);
  }

  componentWillUnmount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.handleNavbar, true);
    }

    return false;
  }

  getLast() {
    const { ayahIds } = this.props;

    return [...ayahIds][[...ayahIds].length - 1];
  }

  getFirst() {
    const { ayahIds } = this.props;

    return [...ayahIds][0];
  }

  handleOptionChange = (payload) => {
    const {surah, options, actions} = this.props; // eslint-disable-line no-shadow, max-len
    const from = this.getFirst();
    const to = this.getLast();

    actions.options.setOption(payload);

    return actions.ayah.load(surah.id, from, to, Object.assign({}, options, payload));
  }

  handleNavbar = () => {
    // TODO: This should be done with react!
    if (window.pageYOffset > lastScroll) {
      document.querySelector('nav').classList.add('scroll-up');
    } else {
      document.querySelector('nav').classList.remove('scroll-up');
    }

    lastScroll = window.pageYOffset;

    return false;
  }

  handleVerseDropdownClick = (ayahNum) => {
    const { ayahIds, surah, actions } = this.props; // eslint-disable-line no-shadow

    actions.ayah.setCurrentAyah(`${surah.id}:${ayahNum}`);

    if (ayahIds.has(ayahNum)) {
      return false;
    }

    if (ayahNum > (this.getLast() + 10) || ayahNum < this.getFirst()) {
      // This is beyond lazy loading next page.
      return actions.push.push(`/${surah.id}/${ayahNum}-${ayahNum + 10}`);
    }

    return this.handleLazyLoadAyahs(() => setTimeout(() =>
      scroller.scrollTo(`ayah:${surah.id}:${ayahNum}`),
    1000)); // then scroll to it
  }

  handleLazyLoadAyahs = (callback) => {
    const { ayahIds, surah, isEndOfSurah, options, actions } = this.props; // eslint-disable-line no-shadow, max-len
    const range = [this.getFirst(), this.getLast()];

    let size = 10;

    if ((range[1] - range[0] + 1) < 10) {
      size = range[1] - range[0] + 1;
    }

    const from = range[1];
    const to = (from + size);

    if (!isEndOfSurah && !ayahIds.has(to)) {
      actions.ayah.load(surah.id, from, to, options).then(() => {
        this.setState({lazyLoading: false});
        if (callback) {
          callback();
        }
      });
    }

    return false;
  }

  title() {
    const { params, surah } = this.props;

    if (params.range) {
      return `Surah ${surah.name.simple} [${surah.id}:${params.range}]`;
    }

    return `Surah ${surah.name.simple} [${surah.id}]`;
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

          return '';
        });

        const content = translations.join(' - ').slice(0, 250);

        return `Surat ${surah.name.simple} [verse ${params.range}] - ${content}`;
      }

      const ayah = ayahs[`${surah.id}:${params.range}`];

      if (ayah && ayah.content && ayah.content[0]) {
        return `Surat ${surah.name.simple} [verse ${params.range}] - ${ayah.content[0].text}`;
      }

      return `Surat ${surah.name.simple} [verse ${params.range}]`;
    }

    return `${descriptions[surah.id]} This Surah has ${surah.ayat} ayahs and resides between pages ${surah.page[0]} to ${surah.page[1]} in the Quran.`; // eslint-disable-line max-len
  }

  renderPagination() {
    const { isLoading, isEndOfSurah, surah } = this.props;

    return (
      <LazyLoad
        onLazyLoad={this.handleLazyLoadAyahs}
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

  renderAyahs() {
    const { ayahs, actions, options } = this.props; // eslint-disable-line no-shadow

    return Object.values(ayahs).map(ayah => (
      <Ayah
        ayah={ayah}
        tooltip={options.tooltip}
        onWordClick={actions.audio.setCurrentWord}
        actions={actions.audio}
        key={`${ayah.surahId}-${ayah.ayahNum}-ayah`}
      />
    ));
  }

  renderLines() {
    const { lines, options } = this.props;
    const keys = Object.keys(lines);

    return keys.map((lineNum, index) => {
      const nextNum = keys[index + 1];
      const pageNum = lineNum.split('-')[0];
      const line = lines[lineNum];

      if (index + 1 !== keys.length && pageNum !== nextNum.split('-')[0]) {
        return [
          <Line line={line} key={lineNum} tooltip={options.tooltip} />,
          <PageBreak pageNum={parseInt(pageNum, 10) + 1} />
        ];
      }

      return <Line line={line} key={lineNum} tooltip={options.tooltip} />;
    });
  }

  renderTopOptions() {
    const {
      options,
      surah,
      actions // eslint-disable-line no-shadow
    } = this.props;

    return (
      <Row>
        <Col md={6} mdOffset={6} className="text-right">
          <ul className="list-inline">
            <li>
              <InformationToggle
                onToggle={actions.options.setOption}
                isShowingSurahInfo={options.isShowingSurahInfo}
              />
            </li>
            <li>|</li>
            <li>
              <FontSizeDropdown
                options={options}
                onOptionChange={actions.options.setOption}
              />
            </li>
            <li>|</li>
            <li>
              <TooltipDropdown
                options={options}
                onOptionChange={actions.options.setOption}
              />
            </li>
            <li>|</li>
            <li>
              <ReadingModeToggle
                isToggled={options.isReadingMode}
                onReadingModeToggle={actions.options.toggleReadingMode}
              />
            </li>
            <li><Share surah={surah} /></li>
          </ul>
        </Col>
      </Row>
    );
  }

  render() {
    const { surah, surahs, ayahIds, options } = this.props;

    debug('component:Surah', 'Render');

    return (
      <div className="surah-body">
        <Helmet
          {...makeHeadTags({
            title: this.title(),
            description: this.description()
          })}
          script={[{
            type: 'application/ld+json',
            innerHTML: `{
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
          }]}
          style={[{
            cssText: `.text-arabic{font-size: ${options.fontSize.arabic}rem;} .text-translation{font-size: ${options.fontSize.translation}rem;}` // eslint-disable-line max-len
          }]}
        />
        <Header surah={surah}>
          <Row className="navbar-bottom">
            <Col md={9}>
              <Row>
                <SurahsDropdown
                  surahs={surahs}
                  className={`col-md-3 ${style.rightborder} ${style.dropdown}`}
                />
                <VersesDropdown
                  ayat={surah.ayat}
                  loadedAyahs={ayahIds}
                  isReadingMode={options.isReadingMode}
                  onClick={this.handleVerseDropdownClick}
                  surah={surah}
                  className={`col-md-1 ${style.rightborder} ${style.dropdown}`}
                />
                <ReciterDropdown
                  onOptionChange={this.handleOptionChange}
                  options={options}
                  className={`col-md-2 ${style.rightborder} ${style.dropdown}`}
                />
                <Audioplayer
                  surah={surah}
                  onLoadAyahs={this.handleLazyLoadAyahs}
                  className={`col-md-4 ${style.rightborder}`}
                />
                <ContentDropdown
                  onOptionChange={this.handleOptionChange}
                  options={options}
                  className={`col-md-2 ${style.rightborder} ${style.dropdown}`}
                />
              </Row>
            </Col>
            <Col md={3}>
              <Row>
                <SearchInput
                  className="col-md-12 search-input"
                />
              </Row>
            </Col>
          </Row>
        </Header>
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

const AsyncSurah = asyncConnect([ { promise: surahsConnect }, { promise: ayahsConnect } ])(Surah);

function mapStateToProps(state, ownProps) {
  const surahId = parseInt(ownProps.params.surahId, 10);
  const surah: Object = state.surahs.entities[surahId];
  const ayahs: Object = state.ayahs.entities[surahId];
  const ayahIds = new Set(Object.keys(ayahs).map(key => parseInt(key.split(':')[1], 10)));

  return {
    surah,
    ayahs,
    ayahIds,
    isStarted: state.audioplayer.isStarted,
    currentWord: state.ayahs.currentWord,
    isEndOfSurah: ayahIds.size === surah.ayat,
    surahs: state.surahs.entities,
    isLoading: state.ayahs.loading,
    isLoaded: state.ayahs.loaded,
    lines: state.lines.lines,
    options: state.options
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      options: bindActionCreators(OptionsActions, dispatch),
      ayah: bindActionCreators(AyahActions, dispatch),
      audio: bindActionCreators(AudioActions, dispatch),
      push: bindActionCreators(push, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncSurah);
