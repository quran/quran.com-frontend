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

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  api: process.env.API_URL,
  oneQuran: process.env.ONE_QURAN_URL,
  sentryClient: process.env.SENTRY_KEY_CLIENT,
  sentryServer: process.env.SENTRY_KEY_SERVER,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  app: {
    head: {
      titleTemplate: `%s - ${title}`,
      meta: [
        {charset: 'utf-8'},
        {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
        {'http-equiv': 'Content-Language', content: 'EN; AR'},
        {name: 'description', content: description},
        {name: 'keywords', content: 'quran, koran, qur\'an, kareem, قران, القرآن, قران كريم, القران الكريم, surah, yasin, yaseen, kahf, mulk, rahman, muslim, islam, Allah'}, // eslint-disable-line max-len
        {name: 'Charset', content: 'UTF-8'},
        {name: 'Distribution', content: 'Global'},
        {name: 'Rating', content: 'General'},
        {name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1'},
        {name: 'google-site-verification', content: 'ehFz7FvmL7V9MzP40F8_kLABhCzqGzMDMrCnUP44Too'},
        {name: 'theme-color', content: '#004f54'},
        {property: 'og:site_name', content: title},
        {property: 'og:image', content: 'https://quran.com/images/thumbnail.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:url', content: 'https://quran.com'},
        {property: 'og:type', content: 'website'},
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description},
        {name: 'twitter:image', content: 'https://quran.com/images/thumbnail.png'},
        {name: 'twitter:image:width', content: '200'},
        {name: 'twitter:image:height', content: '200'}
      ],
      link: [
        {rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png'},
        {rel: 'apple-touch-icon-precomposed', href: '/images/apple-touch-icon-precomposed.png'},
        {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'}
      ],
      /* SEO: https://developers.google.com/structured-data/slsb-overview#markup_examples */
      /* SEO: https://developers.google.com/structured-data/site-name#markup_requirements */
      script: [
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
  }
}, environment);
