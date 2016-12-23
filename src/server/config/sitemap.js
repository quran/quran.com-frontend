import sitemap from 'sitemap';

import ApiClient from 'helpers/ApiClient';

export default (server) => {
  server.get('/sitemap.xml', (req, res) => {
    const client = new ApiClient(req);
    const urls = [];

    client.get('/api/v2/surahs').then((surahs) => {
      surahs.forEach((surah) => {
        Array.apply(null, { length: surah.ayat }).forEach((_, index) => {
          const ayahId = index + 1;

          urls.push({
            url: `/${surah.id}/${ayahId}`,
            changefreq: 'weekly',
            priority: 1
          });

          urls.push({
            url: `/${surah.id}/${ayahId}-${ayahId + 9}`,
            changefreq: 'weekly',
            priority: 1
          });
        });

        urls.push({
          url: `/${surah.id}`,
          changefreq: 'weekly',
          priority: 1
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
    }).catch(err => console.trace(err));
  });
};
