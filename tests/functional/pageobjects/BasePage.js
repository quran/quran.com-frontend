module.exports = class BasePage {

  constructor(selectors) {

    this.selectors = Object.assign(selectors, {
      SURAH_PAGE_SURAH_NAME: '.surah-body .navbar-text.surah-name'
    });

  }

  getSurahName() {
    return browser.getText(this.selectors.SURAH_PAGE_SURAH_NAME);
  }

  goHome() {
    browser.url('http://quran.com');
  }

};
