import sitemap from 'sitemap';

const urls = [];

Array.apply(null, {length: 114}).forEach((_, index) => {
  const surahId = index;

  urls.push({
    url: `/${surahId}`,
    changefreq: 'daily',
    priority: 0.9
  });
});

const xml = sitemap.createSitemap({
  hostname: 'http://quran.com',
  cacheTime: 600000,  // 600 sec cache period
  urls: [
    ...urls,
    { url: '/about',  changefreq: 'monthly', priority: 0.3 },
    { url: '/contactus',  changefreq: 'monthly', priority: 0.3 },
    { url: '/contact',  changefreq: 'monthly', priority: 0.3 },
    { url: '/donations',  changefreq: 'monthly', priority: 0.3 },
    { url: '/contributions',  changefreq: 'monthly', priority: 0.3 },

    { url: '/search',  changefreq: 'weekly',  priority: 0.7 }
  ]
});

export default (server) => {
  server.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.send(xml.toString());
  });
}
