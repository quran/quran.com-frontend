import React from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import Button from 'quran-components/lib/Button';
import ComponentLoader from 'components/ComponentLoader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { surahType, infoType } from 'types';
import makeHeadTags from 'helpers/makeHeadTags';

import { chaptersConnect, chapterInfoConnect } from '../Surah/connect';

const SurahInfo = Loadable({
  loader: () => import('components/SurahInfo'),
  LoadingComponent: ComponentLoader
});

const ChapterInfo = ({ chapter, info }) => (
  <div className="row" style={{ marginTop: 20 }}>
    <Helmet
      {...makeHeadTags({
        title: `Surah ${chapter.nameSimple} [${chapter.chapterNumber}]`,
        description: `${info ? info.shortText : ''} This Surah has ${chapter.versesCount} verses and resides between pages ${chapter.pages[0]} to ${chapter.pages[1]} in the Quran.` // eslint-disable-line max-len
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
      }]}
    />
    <SurahInfo
      chapter={chapter}
      info={info}
      isShowingSurahInfo
    />
    <div className="text-center">
      <Button href={`/${chapter.id}`}>
        <LocaleFormattedMessage id="surah.read" defaultMessage="Read full Surah" />
      </Button>
    </div>
  </div>
);

ChapterInfo.propTypes = {
  chapter: surahType,
  info: infoType
};

const AsyncChapterInfo = asyncConnect([
  { promise: chaptersConnect },
  { promise: chapterInfoConnect }
])(ChapterInfo);

function mapStateToProps(state, ownProps) {
  const chapterId = parseInt(ownProps.params.chapterId, 10);
  const chapter: Object = state.chapters.entities[chapterId];

  return {
    chapter,
    info: state.chapters.infos[chapterId]
  };
}

export default connect(mapStateToProps)(AsyncChapterInfo);
