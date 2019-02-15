import React from 'react';
import Helmet from 'react-helmet';
import { asyncComponent } from 'react-async-component';
import Button from 'quran-components/lib/Button';
import T, { KEYS } from './T';
import makeHelmetTags from '../helpers/makeHelmetTags';
import { ChapterShape, ChapterInfoShape } from '../shapes';

const ChapterInfoPanelContainer = asyncComponent({
  resolve: () =>
    import(/* webpackChunkName: "ChapterInfoPanelContainer" */ '../containers/ChapterInfoPanelContainer'),
});

const propTypes = {
  chapter: ChapterShape.isRequired,
  chapterInfo: ChapterInfoShape.isRequired,
};

type Props = {
  chapter: ChapterShape;
  chapterInfo: ChapterInfoShape;
};

const ChapterInfo: React.SFC<Props> = ({ chapter, chapterInfo }: Props) => (
  <div className="row" style={{ marginTop: 20 }}>
    <Helmet
      {...makeHelmetTags({
        title: `Surah ${chapter.nameSimple} [${chapter.chapterNumber}]`,
        description: `${
          chapterInfo ? chapterInfo.shortText : ''
        } This Surah has ${
          chapter.versesCount
        } verses and resides between pages ${chapter.pages[0]} to ${
          chapter.pages[1]
        } in the Quran.`, // eslint-disable-line max-len
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
        }`,
        },
      ]}
    />
    <ChapterInfoPanelContainer chapter={chapter} />
    <div className="text-center">
      <Button href={`/${chapter.id}`}>
        <T id={KEYS.CHAPTER_READ} />
      </Button>
    </div>
  </div>
);

ChapterInfo.propTypes = propTypes;

export default ChapterInfo;
