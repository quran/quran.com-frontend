import * as customPropTypes from 'customPropTypes';
import React from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import Button from 'quran-components/lib/Button';
import ComponentLoader from 'components/ComponentLoader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import makeHeadTags from 'helpers/makeHeadTags';

const ChapterInfoPanel = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ChapterInfoPanel" */ 'components/ChapterInfoPanel'),
  LoadingComponent: ComponentLoader
});

const ChapterInfo = ({ chapter, chapterInfo }) => (
  <div className="row" style={{ marginTop: 20 }}>
    <Helmet
      {...makeHeadTags({
        title: `Surah ${chapter.nameSimple} [${chapter.chapterNumber}]`,
        description: `${
          chapterInfo ? chapterInfo.shortText : ''
        } This Surah has ${
          chapter.versesCount
        } verses and resides between pages ${chapter.pages[0]} to ${
          chapter.pages[1]
        } in the Quran.` // eslint-disable-line max-len
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
    <ChapterInfoPanel
      chapter={chapter}
      chapterInfo={chapterInfo}
      isShowingSurahInfo
    />
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
  chapter: customPropTypes.surahType,
  chapterInfo: customPropTypes.infoType
};

function mapStateToProps(state, ownProps) {
  const chapterId = parseInt(ownProps.match.params.chapterId, 10);
  const chapter = state.chapters.entities[chapterId];

  return {
    chapter: state.chapters.entities[chapterId],
    chapterInfo: state.chapterinfos.entities[chapterId]
  };
}

export default connect(mapStateToProps)(ChapterInfo);
