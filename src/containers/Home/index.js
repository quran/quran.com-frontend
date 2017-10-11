import React, { Component } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import Tabs, { Tab } from 'quran-components/lib/Tabs';
import Loader from 'quran-components/lib/Loader';

import * as customPropTypes from '../../customPropTypes';
import debug from '../../helpers/debug';
import IndexHeader from '../../components/IndexHeader';
import SurahsList from '../../components/Home/SurahsList';
import QuickSurahs from '../../components/Home/QuickSurahs';
import LocaleFormattedMessage from '../../components/LocaleFormattedMessage';
import ComponentLoader from '../../components/ComponentLoader';
import { chaptersConnect, juzsConnect } from '../Surah/connect';

const JuzList = Loadable({
  loader: () =>
    import(/* webpackChunkName: "juz-list" */ '../../components/Home/JuzList'),
  LoadingComponent: ComponentLoader
});

const LastVisit = Loadable({
  loader: () =>
    import(/* webpackChunkName: "last-visit" */ '../../components/Home/LastVisit'),
  LoadingComponent: ComponentLoader
});

export const Title = styled.h4`
  font-size: 14px;

  span {
    margin: 0;
    line-height: 2;
    a {
      padding: 0 15px;
    }
  }

  &:last-child {
    margin-top: 25px;
  }
`;

class Home extends Component {
  renderJuzList() {
    const { chapters, juzs } = this.props;

    if (juzs.loading) {
      return (
        <div className="row">
          <Loader isActive relative />
        </div>
      );
    }

    const juzList = Object.values(juzs.entities);

    return (
      <div className="row">
        <JuzList chapters={chapters} juzs={juzList.slice(0, 20)} />
        <JuzList chapters={chapters} juzs={juzList.slice(20, 28)} />
        <JuzList chapters={chapters} juzs={juzList.slice(28, 30)} />
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderChapterList(chaptersList) {
    return (
      <div className="row">
        <SurahsList chapters={chaptersList.slice(0, 38)} />
        <SurahsList chapters={chaptersList.slice(38, 76)} />
        <SurahsList chapters={chaptersList.slice(76, 114)} />
      </div>
    );
  }

  render() {
    debug('component:Home', 'Render');

    const lastVisit = cookie.load('lastVisit') || null;
    const { chapters } = this.props;
    const chaptersList = Object.values(chapters);

    const chapterTitle = (
      <Title className="text-muted">
        <LocaleFormattedMessage
          id="surah.index.heading"
          defaultMessage="SURAHS (CHAPTERS)"
        />
      </Title>
    );

    const juzTitle = (
      <Title className="text-muted">
        <LocaleFormattedMessage id="juz.index.heading" defaultMessage="Juz" />
      </Title>
    );

    return (
      <div className="index-page">
        <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
        <IndexHeader />
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {lastVisit &&
                <LastVisit
                  chapter={chapters[lastVisit.chapterId]}
                  verse={lastVisit.verseId}
                />}
              <QuickSurahs />

              <Tabs>
                <Tab title={chapterTitle}>
                  {this.renderChapterList(chaptersList)}
                </Tab>

                <Tab title={juzTitle}>
                  {this.renderJuzList()}
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
  juzs: customPropTypes.juzs.isRequired
};

const AsyncHome = asyncConnect([
  { promise: chaptersConnect },
  { promise: juzsConnect }
])(Home);

function mapStateToProps(state) {
  return {
    chapters: state.chapters.entities,
    juzs: state.juzs
  };
}

export default connect(mapStateToProps)(AsyncHome);
