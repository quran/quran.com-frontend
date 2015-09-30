let url;
if (process.env.NODE_ENV === 'production' && process.env.VERSION === 'old') {
  url = 'http://api.quran.com:3000/';
}
else if (process.env.NODE_ENV === 'production') {
  url = 'http://api.quran.com:3000/';
}
else {
  url = 'http://api.quran.com:3000/';
}

export default {
  url: url,
  version: '1.0.1'
};
