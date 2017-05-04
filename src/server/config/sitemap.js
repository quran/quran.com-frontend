import sitemap from 'sitemap';

import ApiClient from 'helpers/ApiClient';

export default (server) => {
  server.get('/sitemap.xml', (req, res) => {
    const client = new ApiClient(req);
    const urls = [];

    client.get('/api/v3/options/translations').then((r) => {
      const translations = r.translations;

      client.get('/api/v3/chapters').then((response) => {
        response.chapters.forEach((chapter) => {
          // add chapter url
          urls.push({
            url: `/${chapter.id}`,
            changefreq: 'weekly',
            priority: 1
          });

          // add chapter info for available languages
          ['en', 'ur', 'ml', 'ta'].forEach((lang) => {
            urls.push({
              url: `/${chapter.id}/info/${lang}`,
              changefreq: 'weekly',
              priority: 1
            });
          });

          // Add urls for all verse of chapter
          Array(chapter.versesCount).fill().forEach((_, index) => {
            const verseId = index + 1;

            urls.push({
              url: `/${chapter.id}/${verseId}`,
              changefreq: 'weekly',
              priority: 1
            });

            urls.push({
              url: `/${chapter.id}/${verseId + 10}`,
              changefreq: 'weekly',
              priority: 1
            });

            // Add verse url with translations
            translations.forEach((translation) => {
              urls.push({
                url: `/${chapter.id}/${verseId}/${translation.slug || translation.id}`,
                changefreq: 'weekly',
                priority: 1
              });

              urls.push({
                url: `/${chapter.id}/${verseId + 10}/${translation.slug || translation.id}`,
                changefreq: 'weekly',
                priority: 1
              });

            });
          });
        });

        const xml = sitemap.createSitemap({
          hostname: 'https://quran.com',
          cacheTime: 600000,  // 600 sec cache period
          urls: [
            ...urls,
            { url: '/about', changefreq: 'monthly', priority: 0.3 },
            { url: '/contactus', changefreq: 'monthly', priority: 0.3 },
            { url: '/contact', changefreq: 'monthly', priority: 0.3 },
            { url: '/donations', changefreq: 'monthly', priority: 0.3 },
            { url: '/contributions', changefreq: 'monthly', priority: 0.3 },
            { url: '/search', changefreq: 'weekly', priority: 0.8 }
          ]
        });

        res.header('Content-Type', 'application/xml');
        res.send(xml.toString());
      });
    }).catch(err => console.trace(err)); // eslint-disable-line
  });
};
