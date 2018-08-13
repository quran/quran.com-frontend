import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { asyncComponent } from 'react-async-component';
import Tabs, { Tab } from 'quran-components/lib/Tabs';
import Loader from 'quran-components/lib/Loader';
import Title from './home/Title';
import ChaptersList from './ChaptersList';
import QuickChapters from './QuickChapters';
import T, { KEYS } from './T';
import Jumbotron from './Jumbotron';
import { FetchChapters } from '../redux/actions/chapters';
import { FetchJuzs } from '../redux/actions/juzs';
import { NUMBER_OF_CHAPTERS, NUMBER_OF_JUZS } from '../constants';

const JuzList = asyncComponent({
  resolve: () => import(/* webpackChunkName: "JuzList" */ './JuzList'),
});

type Props = {
  fetchChapters: FetchChapters;
  fetchJuzs: FetchJuzs;
  loadingChapters: boolean;
  loadingJuzs: boolean;
  chapters: $TsFixMe;
  juzs: $TsFixMe;
};

const loaderStyle = { position: 'relative', overflow: 'hidden' };

class Home extends Component<Props> {
  fetchChapters = () => {
    const { fetchChapters, chapters } = this.props;

    if (Object.keys(chapters).length === NUMBER_OF_CHAPTERS) return null;

    if (__CLIENT__) {
      fetchChapters();

      return null;
    }

    return fetchChapters();
  };

  fetchJuzs = () => {
    const { fetchJuzs, juzs } = this.props;

    if (Object.keys(juzs).length === NUMBER_OF_JUZS) return null;

    if (__CLIENT__) {
      fetchJuzs();

      return null;
    }

    return fetchJuzs();
  };

  bootstrap() {
    const promises = [this.fetchChapters(), this.fetchJuzs()];

    return Promise.all(promises);
  }

  render() {
    const { chapters, juzs, loadingJuzs, loadingChapters } = this.props;

    const chapterTitle = (
      <Title className="text-muted">
        <T id={KEYS.CHAPTER_INDEX_HEADING} />
      </Title>
    );

    const juzTitle = (
      <Title className="text-muted">
        <T id={KEYS.JUZ_INDEX_HEADING} />
      </Title>
    );

    let juzsTab = (
      <div className="row">
        <Loader isActive relative style={loaderStyle} />
      </div>
    );

    let chaptersTab = (
      <div className="row">
        <Loader isActive relative style={loaderStyle} />
      </div>
    );

    if (!loadingJuzs) {
      const juzList = Object.values(juzs);

      juzsTab = (
        <div className="row">
          <JuzList chapters={chapters} juzs={juzList.slice(0, 20)} />
          <JuzList chapters={chapters} juzs={juzList.slice(20, 28)} />
          <JuzList chapters={chapters} juzs={juzList.slice(28, 30)} />
        </div>
      );
    }

    if (!loadingChapters) {
      const chaptersList = Object.values(chapters);

      chaptersTab = (
        <div className="row">
          <ChaptersList chapters={chaptersList.slice(0, 38)} />
          <ChaptersList chapters={chaptersList.slice(38, 76)} />
          <ChaptersList chapters={chaptersList.slice(76, 114)} />
        </div>
      );
    }

    return (
      <div className="index-page">
        <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
        <Jumbotron />
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <QuickChapters />
              <Tabs>
                <Tab title={chapterTitle}>{chaptersTab}</Tab>
                <Tab title={juzTitle}>{juzsTab}</Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
