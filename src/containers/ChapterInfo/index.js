import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import * as customPropTypes from 'customPropTypes';

import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import Button from 'quran-components/lib/Button';
import ComponentLoader from 'components/ComponentLoader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import makeHeadTags from 'helpers/makeHeadTags';

import chapterQuery from 'graphql/queries/chapter';
import chapterInfoQuery from 'graphql/queries/chapterInfo';

const Info = Loadable({
  loader: () =>
    import(/* webpackChunkName: "surahinfo" */ 'components/SurahInfo'),
  loading: ComponentLoader
});

const ChapterInfo = ({
  chapterQuery: { chapter },
  chapterInfoQuery: { chapterInfo }
}) =>
  chapter && (
    <div className="row" style={{ marginTop: 20 }}>
      <Helmet
        {...makeHeadTags({
          title: `Surah ${chapter.nameSimple} [${chapter.chapterNumber}]`,
          description: `${chapterInfo
            ? chapterInfo.shortText
            : ''} This Surah has ${chapter.versesCount} verses and resides between pages ${chapter
            .pages[0]} to ${chapter.pages[1]} in the Quran.` // eslint-disable-line max-len
        })}
        script={[
          {
            type: 'application/ld+json',
            innerHTML: `{
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://quran.com/",
              "name": "Quran"
            }
          },{
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://quran.com/${chapter.chapterNumber}",
              "name": "${chapter.nameSimple}"
            }
          }]
        }`
          }
        ]}
      />
      <Info chapter={chapter} chapterInfo={chapterInfo} isShowingSurahInfo />
      <div className="text-center">
        <Button href={`/${chapter.id}`}>
          <LocaleFormattedMessage
            id="surah.read"
            defaultMessage="Read full Surah"
          />
        </Button>
      </div>
    </div>
  );

ChapterInfo.propTypes = {
  chapterQuery: PropTypes.shape({
    chapter: customPropTypes.chapterType
  }),
  chapterInfoQuery: PropTypes.shape({
    chapterInfo: customPropTypes.infoType
  })
};

export default compose(
  graphql(chapterQuery, {
    name: 'chapterQuery',
    options: ({ match: { params } }) => ({
      variables: { chapterId: params.chapterId }
    })
  }),
  graphql(chapterInfoQuery, {
    name: 'chapterInfoQuery',
    options: ({ match: { params } }) => ({
      variables: { chapterId: params.chapterId }
    })
  })
)(ChapterInfo);
