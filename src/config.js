const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const title = 'Al-Qur\'an al-Kareem - القرآن الكريم';
const description = 'The Quran translated into many languages in a simple and easy interface.';

const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  api: process.env.API_URL,
  oneQuran: process.env.ONE_QURAN_URL,
  sentryClient: process.env.SENTRY_KEY_CLIENT,
  sentryServer: process.env.SENTRY_KEY_SERVER,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  // Supported locales
  locales: { en: 'English', ar: 'العربية', ur: 'اردو' },
  defaultLocale: 'en',
  app: {
    head: {
      titleTemplate: `%s - ${title}`,
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
        { 'http-equiv': 'Content-Language', content: 'EN; AR' },
        { name: 'description', content: description },
        { name: 'keywords', content: 'quran, koran, qur\'an, kareem, قران, القرآن, قران كريم, القران الكريم, surah, yasin, yaseen, kahf, mulk, rahman, muslim, islam, Allah' }, // eslint-disable-line max-l en
        { name: 'Charset', content: 'UTF-8' },
        { name: 'Distribution', content: 'Global' },
        { name: 'Rating', content: 'General' },
        { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1' },
        { name: 'google-site-verification', content: 'ehFz7FvmL7V9MzP40F8_kLABhCzqGzMDMrCnUP44Too' },
        { name: 'theme-color', content: '#004f54' },
        { property: 'og:site_name', content: title },
        { property: 'og:image', content: 'https://quran.com/images/thumbnail.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://quran.com' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: 'https://quran.com/images/thumbnail.png' },
        { name: 'twitter:image:width', content: '200' },
        { name: 'twitter:image:height', content: '200' },
        { name: 'google-play-app', content: 'app-id=com.quran.labs.androidquran' },
        { name: 'apple-itunes-app', content: 'app-id=1118663303' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: title },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'application-name', content: 'Al-Quran - القرآن الكريم' },
        { name: 'msapplication-TileColor', content: '#004f54' },
        { name: 'msapplication-tooltip', content: description },
        { name: 'msapplication-starturl', content: 'https://quran.com' },
        { name: 'msapplication-navbutton-color', content: '#004f54' },
        { name: 'msapplication-square70x70logo', content: '/mstitle-70x70.jpg' },
        { name: 'msapplication-square150x150logo', content: '/mstitle-150x150.jpg' },
        { name: 'msapplication-wide310x150logo', content: '/mstitle-310x150.jpg' },
        { name: 'msapplication-square310x310logo', content: '/mstitle-310x310.jpg' }
      ],
      link: [
        { rel: 'manifest', href: 'manifest.json' },
        { rel: 'search', type: 'application/opensearchdescription+xml', href: '/opensearch.xml', title: 'Quran.com' },
        { rel: 'fluid-icon', href: '/apple-touch-icon-180x180.png', title: 'Quran.com' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png', sizes: '192x192' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#004f54' },
        { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
        { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
        { rel: 'preconnect', href: 'https://quran-1f14.kxcdn.com', crossOrigin: '' },
        { rel: 'preconnect', href: 'https://assets-1f14.kxcdn.com', crossOrigin: '' }
      ],
      /* SEO: https://developers.google.com/structured-data/slsb-overview#markup_examples */
      /* SEO: https://developers.google.com/structured-data/site-name#markup_requirements */
      script: [
        { src: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en', async: '', defer: '' },
        {
          type: 'application/ld+json',
          innerHTML: `{
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "Quran",
            "alternateName": "Quran.com",
            "url": "https://quran.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://quran.com/search?q={search_term_string}&referrer=sitelinks_searchbox",
              "query-input": "required name=search_term_string"
            }
          }`
        },
        {
          type: 'application/ld+json',
          innerHTML: `{
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "https://quran.com",
            "logo": "https://quran.com/images/thumbnail.png"
          }`
        }
      ]
    }
  },
  ...environment
};


export default config;
