import * as customPropTypes from 'customPropTypes';
import React from 'react';
import { compose, graphql } from 'react-apollo';

import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import Button from 'quran-components/lib/Button';
import ComponentLoader from 'components/ComponentLoader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import makeHeadTags from 'helpers/makeHeadTags';

import verseTafsirQuery from 'graphql/queries/verseTafsir';
import verseQuery from 'graphql/queries/verse';

const Tafsir = Loadable({
  loader: () => import('components/Tafsir'),
  loading: ComponentLoader
});

const VerseTafsir = ({
  verseTafsirQuery: { verseTafsir },
  verseQuery: { verse },
  match: { params }
}) =>
  verseTafsir &&
  <div className="row" style={{ marginTop: 20 }}>
    <Helmet
      {...makeHeadTags({
        title: `${verseTafsir ? verseTafsir.resourceName : 'Tafsir'} of ${verse.verseKey}`,
        description: `${verseTafsir ? verseTafsir.resourceName : 'Tafsir'} of ${verse.verseKey} - ${verse.textMadani}` // eslint-disable-line max-len
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
              "@id": "https://quran.com/${verse.verseKey}",
              "name": "${verse.verseKey}"
            }
          }]
        }`
        }
      ]}
    />

    <div className={'container-fluid'}>
      <div className="row">
        <Tafsir tafsir={verseTafsir} verse={verse} />

        <div className="col-md-12">
          <div className="text-center">
            <Button href={`/${params.chapterId}/${params.verseNumber}`}>
              <LocaleFormattedMessage
                id="verse.backToAyah"
                defaultMessage="Back to Ayah"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>;

VerseTafsir.propTypes = {
  verse: customPropTypes.verseType,
  tafsir: customPropTypes.tafsirType
};

export default compose(
  graphql(verseTafsirQuery, {
    name: 'verseTafsirQuery',
    options: ({ match: { params } }) => ({
      variables: {
        tafsirId: params.tafsirId,
        verseKey: `${params.chapterId}:${params.verseNumber}`
      }
    })
  }),
  graphql(verseQuery, {
    name: 'verseQuery',
    options: ({ match: { params } }) => ({
      variables: {
        verseKey: `${params.chapterId}:${params.verseNumber}`
      }
    })
  })
)(VerseTafsir);
