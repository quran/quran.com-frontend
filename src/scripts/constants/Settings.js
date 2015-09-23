let Settings;

Settings = {
  url: `localhost:${process.env.PORT || 8000}/api/`,
  api: 'http://api.quran.com:3000/',
  version: '1.0.0'
};

if (process.env.NODE_ENV === 'production') {
  Settings.url = 'quran.com/api/'
}


export default Settings;
