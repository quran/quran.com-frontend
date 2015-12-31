require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiUrl: process.env.API_URL,
  pirateUrl: process.env.PIRATE_URL,
  app: {
    title: 'The Noble Qur\'an - القرآن الكريم',
    description: 'The Noble Qur\'an in many languages in an easy-to-use interface.',
    meta: {
      charSet: 'utf-8',
      httpEquiv: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Language': 'EN; AR'
      },
      name: {
        'description': 'The Noble Qur\'an in many languages in an easy-to-use interface.',
        'keywords': 'quran, koran, qur\'an, al quran, al kareem, surah yasin, surah yaseen, yasin, surah, holy, arabic, iman, islam, Allah, book, muslim',
        'Charset': 'UTF-8',
        'Distribution': 'Global',
        'Rating': 'General'
      },
      property: {
        'og:site_name': 'The Noble Qur\'an - القرآن الكريم',
        'og:image': 'http://quran.com/images/thumbnail.png',
        'og:locale': 'en_US',
        'og:title': 'The Noble Qur\'an - القرآن الكريم',
        'og:description': 'The Noble Qur\'an in many languages in an easy-to-use interface.',
        'og:url': 'http://quran.com',
        'og:type': 'website',
        'twitter:card': 'summary',
        'twitter:title': 'The Noble Qur\'an - القرآن الكريم',
        'twitter:description': 'The Noble Qur\'an in many languages in an easy-to-use interface.',
        'twitter:image': 'http://quran.com/images/thumbnail.png',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
