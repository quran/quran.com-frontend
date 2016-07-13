import BasePage from './BasePage';
export default class HomePage extends BasePage {

  constructor(browser) {

    let selectors = {
      LANDING_TEXT: 'h4.title',
      NEXT: 'a[data-direction="next"]',
      PREVIOUS: 'a[data-direction="previous"]',
      SURAH_LIST: '.row .col-md-4 li',
      SEARCH_FORM: '.searchinput input',
      SEARCH_RESULT_LIST: '.searchinput a',
      SURAH_NAME: '.navbar-text.surah-name'
    };

    super(browser, selectors);
    this.browser = browser;
    this.selectors = selectors
  }



  async getLandingText() {
    var landingText = await browser.getText(this.selectors.LANDING_TEXT);
    return landingText;
  }

  async getNumberOfSurahs() {

    var surahs = await browser.elements(this.selectors.SURAH_LIST);
    return surahs.value.length;

  }

  async searchForSurahAndGoToSurahPage(searchQuery) {

    await browser.setValue(this.selectors.SEARCH_FORM, searchQuery);
    await this.wait(1000);
    await browser.click(this.selectors.SEARCH_RESULT_LIST);
    return await this.getSurahName()

  }

  async clickOntheSurahByName(number) {
    var surahs = await browser.elements('.row .col-xs-7 span');
    var surahID = surahs.value[number].ELEMENT;
    await browser.elementIdClick(surahID);
    await this.wait(1000);

    return await browser.getUrl();

  }

}
