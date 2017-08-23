import React from 'react';
import { graphql } from 'react-apollo';
import * as customPropTypes from 'customPropTypes';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import IndexHeader from 'components/IndexHeader';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import debug from 'helpers/debug';
import LastVisit from 'components/Home/LastVisit';
import SurahsList from 'components/Home/SurahsList';
import JuzList from 'components/Home/JuzList';
import QuickSurahs from 'components/Home/QuickSurahs';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import Tabs, { Tab } from 'quran-components/lib/Tabs';
import Loader from 'quran-components/lib/Loader';

import chaptersQuery from '../../graphql/queries/chapters.js';

const Home = (props) => {
  debug('component:Index', 'Render');

  const lastVisit = cookie.load('lastVisit') || null;

  return (
    <div className="index-page">
      <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
      <IndexHeader />
      {!props.data.loading &&
        <div className={`container ${styles.list}`}>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {lastVisit &&
                <LastVisit
                  chapter={props.data.chapters[lastVisit.chapterId]}
                  verse={lastVisit.verseId}
                />}
              <QuickSurahs />
              <h4 className={`text-muted ${styles.title}`}>
                <LocaleFormattedMessage
                  id="surah.index.heading"
                  defaultMessage="SURAHS (CHAPTERS)"
                />
              </h4>
              <div className="row">
                <SurahsList
                  chapters={Object.values(props.data.chapters).slice(0, 38)}
                />
                <SurahsList
                  chapters={Object.values(props.data.chapters).slice(38, 76)}
                />
                <SurahsList
                  chapters={Object.values(props.data.chapters).slice(76, 114)}
                />
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

Home.propTypes = {
  chapters: customPropTypes.chapters.isRequired,
  juzs: customPropTypes.juzs.isRequired
};

// TODO: readd juzs
export default graphql(chaptersQuery)(Home);
