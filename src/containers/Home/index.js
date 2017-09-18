import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import * as customPropTypes from 'customPropTypes';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import IndexHeader from 'components/IndexHeader';
import cookie from 'react-cookie';
import debug from 'helpers/debug';
import LastVisit from 'components/Home/LastVisit';
import SurahsList from 'components/Home/SurahsList';
import JuzList from 'components/Home/JuzList';
import QuickSurahs from 'components/Home/QuickSurahs';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import Tabs, { Tab } from 'quran-components/lib/Tabs';

import chaptersGraphQuery from '../../graphql/queries/chapters.js';
import juzsGraphQuery from '../../graphql/queries/juzs.js';

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

const Home = ({ chaptersQuery, juzsQuery }) => {
  debug('component:Index', 'Render');

  const lastVisit = cookie.load('lastVisit') || null;

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
      {!chaptersQuery.loading && (
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {lastVisit && (
                <LastVisit
                  chapter={chaptersQuery.chapters[lastVisit.chapterId]}
                  verse={lastVisit.verseId}
                />
              )}
              <QuickSurahs />
              <Tabs>
                <Tab title={chapterTitle}>
                  <div className="row">
                    <SurahsList
                      chapters={Object.values(chaptersQuery.chapters).slice(
                        0,
                        38
                      )}
                    />
                    <SurahsList
                      chapters={Object.values(chaptersQuery.chapters).slice(
                        38,
                        76
                      )}
                    />
                    <SurahsList
                      chapters={Object.values(chaptersQuery.chapters).slice(
                        76,
                        114
                      )}
                    />
                  </div>
                </Tab>

                <Tab title={juzTitle}>
                  {!juzsQuery.loading && (
                    <div className="row">
                      <JuzList
                        chapters={chaptersQuery.chapters}
                        juzs={juzsQuery.juzs.slice(0, 10)}
                      />
                      <JuzList
                        chapters={chaptersQuery.chapters}
                        juzs={juzsQuery.juzs.slice(10, 20)}
                      />
                      <JuzList
                        chapters={chaptersQuery.chapters}
                        juzs={juzsQuery.juzs.slice(20, 30)}
                      />
                    </div>
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  chaptersQuery: PropTypes.shape({
    chapters: customPropTypes.chapters.isRequired
  }),
  juzsQuery: PropTypes.shape({
    juzs: customPropTypes.juzs
  })
};

// TODO: readd juzs
export default compose(
  graphql(chaptersGraphQuery, { name: 'chaptersQuery' }),
  graphql(juzsGraphQuery, { name: 'juzsQuery', options: { ssr: false } })
)(Home);
