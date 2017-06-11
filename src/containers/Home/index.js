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
              <h4 className={`text-muted ${styles.title}`}>
                <LocaleFormattedMessage
                  id="surah.index.heading"
                  defaultMessage="SURAHS (CHAPTERS)"
                />
              </h4>
              {this.renderChapterList(chaptersList)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  chapters: customPropTypes.chapters.isRequired
};

const AsyncHome = asyncConnect([
  {
    promise({ store: { getState, dispatch } }) {
      if (!isAllLoaded(getState())) {
        return dispatch(loadAll());
      }

      return true;
    }
  }
])(Home);

export default connect(state => ({ chapters: state.chapters.entities }))(
  AsyncHome
);
