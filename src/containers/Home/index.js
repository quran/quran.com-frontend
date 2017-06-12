import React, { Component } from 'react';
import * as customPropTypes from 'customPropTypes';
import Helmet from 'react-helmet';
import IndexHeader from 'components/IndexHeader';
import cookie from 'react-cookie';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import debug from 'helpers/debug';
import { isAllLoaded, loadAll } from 'redux/actions/chapters.js';
import LastVisit from 'components/Home/LastVisit';
import SurahsList from 'components/Home/SurahsList';
import QuickSurahs from 'components/Home/QuickSurahs';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import Tabs, { Tab } from 'quran-components/lib/Tabs';

import { chaptersConnect, juzsConnect } from '../Surah/connect';

const styles = require('./style.scss');

class Home extends Component {
  renderChapterList(chapterList) {
    return (
      <div className="row">
        <SurahsList chapters={chapterList.slice(0, 38)} />
        <SurahsList chapters={chapterList.slice(38, 76)} />
        <SurahsList chapters={chapterList.slice(76, 114)} />
      </div>
    );
  }

  render() {
    debug('component:Home', 'Render');

    const lastVisit = cookie.load('lastVisit') || null;
    const { chapters } = this.props;
    const chaptersList = Object.values(chapters);

    const surahTitle = (
     <span className={`text-muted ${styles.title}`}>
       <LocaleFormattedMessage
        id="surah.index.heading"
        defaultMessage="SURAHS (CHAPTERS)"
        />
     </span>);

    return (
      <div className="index-page">
        <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
        <IndexHeader />
        <div className={`container ${styles.list}`}>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {lastVisit &&
                <LastVisit
                  chapter={chapters[lastVisit.chapterId]}
                  verse={lastVisit.verseId}
                />}
              <QuickSurahs />

              <Tabs>
                <Tab title={surahTitle}>
                  {this.renderChapterList(chaptersList)}
                </Tab>
                <Tab title="Juz">
                 Juzz list here
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  chapters: customPropTypes.chapters.isRequired,
  juzs: customPropTypes.juzs.isRequired,
};

const AsyncHome = asyncConnect([
  { promise: chaptersConnect },
  { promise: juzsConnect }
])(Home);

function mapStateToProps(state) {
  return {
    chapters: state.chapters.entities,
    juzs: state.juzs.entities
  };
}

export default connect(mapStateToProps)(AsyncHome);
