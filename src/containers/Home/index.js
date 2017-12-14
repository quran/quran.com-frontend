import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Tabs, { Tab } from 'quran-components/lib/Tabs';
import Loader from 'quran-components/lib/Loader';

import debug from 'helpers/debug';
import ChaptersList from 'components/Home/ChaptersList';
import * as customPropTypes from 'customPropTypes';

import IndexHeader from 'components/IndexHeader';
import JuzList from 'components/Home/JuzList';
import QuickSurahs from 'components/Home/QuickSurahs';
import Title from 'components/Home/Title';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

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

  renderChapterList() {
    const { chapters } = this.props;
    const chaptersList = Object.values(chapters);

    return (
      <div className="row">
        <ChaptersList chapters={chaptersList.slice(0, 38)} />
        <ChaptersList chapters={chaptersList.slice(38, 76)} />
        <ChaptersList chapters={chaptersList.slice(76, 114)} />
      </div>
    );
  }

  render() {
    debug('component:Home', 'Render');

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
              <QuickSurahs />
              <Tabs>
                <Tab title={chapterTitle}>
                  {this.renderChapterList()}
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

const mapStateToProps = state => ({
  chapters: state.chapters.entities,
  juzs: state.juzs
});

export default connect(mapStateToProps)(Home);
