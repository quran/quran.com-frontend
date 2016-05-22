const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const title = 'The Noble Quran - القرآن الكريم'
const description = 'The Noble Quran in many languages in an easy-to-use interface.'

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  api: process.env.API_URL,
  app: {
    head: {
      titleTemplate: `%s - ${title}`,
      meta: [
        {charset: 'utf-8'},
        {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
        {'http-equiv': 'Content-Language', content: 'EN; AR'},
        {name: 'description', content: description},
        {name: 'keywords', content: 'quran, koran, quran, al quran, al kareem, surah yasin, surah yaseen, yasin, surah, holy, arabic, iman, islam, Allah, book, muslim'}, // eslint-disable-line max-len
        {name: 'Charset', content: 'UTF-8'},
        {name: 'Distribution', content: 'Global'},
        {name: 'Rating', content: 'General'},
        {name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1'},
        {name: 'google-site-verification', content: 'ehFz7FvmL7V9MzP40F8_kLABhCzqGzMDMrCnUP44Too'},
        {name: 'theme-color', content: '#004f54'},
        {property: 'og:site_name', content: title},
        {property: 'og:image', content: 'http://quran.com/images/thumbnail.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:url', content: 'http://quran.com'},
        {property: 'og:type', content: 'website'},
        {property: 'twitter:card', content: 'summary'},
        {property: 'twitter:title', content: title},
        {property: 'twitter:description', content: description},
        {property: 'twitter:image', content: 'http://quran.com/images/thumbnail.png'},
        {property: 'twitter:image:width', content: '200'},
        {property: 'twitter:image:height', content: '200'}
      ],
      link: [
        {rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png'},
        {rel: 'apple-touch-icon-precomposed', href: '/images/apple-touch-icon-precomposed.png'}
      ]
    }
  }
}, environment);
