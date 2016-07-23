module.exports = class BasePage {

  constructor() {

    this.selectors = {
      SURAH_NAME: '.surah-body .navbar-text.surah-name'
    };
  }

  wait(time = 200) {

    browser.pause(time);
  }

  getSurahName() {
    return browser.getText(this.selectors.SURAH_NAME);
  }

  goHome() {
    browser.url('http://quran.com');
  }

};
