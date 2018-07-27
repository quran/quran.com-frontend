import { ChapterShape } from '../shapes';

// eslint-disable-next-line
export const chapterLdJson = (chapter: ChapterShape) => [
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
];
