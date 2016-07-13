module.exports = class BasePage {

  constructor(browser, object) {

    this.selectors = {
      SURAH_NAME: '.surah-body .navbar-text.surah-name'
    };
  }


  async wait(time = 200) {

    await browser.pause(time);
  }

  async getSurahName() {
    return await browser.getText(this.selectors.SURAH_NAME);
  }

  async goHome() {
    await browser.url('http://quran.com');
  }

};
