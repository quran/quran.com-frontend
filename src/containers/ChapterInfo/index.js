import * as customPropTypes from 'customPropTypes';
import React from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import Button from 'quran-components/lib/Button';
import ComponentLoader from 'components/ComponentLoader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import makeHeadTags from 'helpers/makeHeadTags';

const SurahInfo = Loadable({
  loader: () =>
    import(/* webpackChunkName: "surahinfo" */ 'components/SurahInfo'),
  loading: ComponentLoader
});

const ChapterInfo = ({ chapter, info }) => (
  <div className="row" style={{ marginTop: 20 }}>
    <Helmet
      {...makeHeadTags({
        title: `Surah ${chapter.nameSimple} [${chapter.chapterNumber}]`,
        description: `${info ? info.shortText : ''} This Surah has ${chapter.versesCount} verses and resides between pages ${chapter.pages[0]} to ${chapter.pages[1]} in the Quran.` // eslint-disable-line max-len
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
    <SurahInfo chapter={chapter} info={info} isShowingSurahInfo />
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
  info: customPropTypes.infoType
};

function mapStateToProps(state, { match: { params } }) {
  const chapterId = parseInt(params.chapterId, 10);
  const chapter: Object = state.chapters.entities[chapterId];

  return {
    chapter,
    info: state.chapters.infos[chapterId]
  };
}

export default connect(mapStateToProps)(ChapterInfo);
