import BasePage from './BasePage';
export default class HomePage extends BasePage {

  constructor(browser) {

    const selectors = {
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
    this.selectors = selectors;
  }

  getLandingText() {
    const landingText = browser.getText(this.selectors.LANDING_TEXT);
    return landingText;
  }

  getNumberOfSurahs() {

    const surahs = browser.elements(this.selectors.SURAH_LIST);
    return surahs.value.length;

  }

  searchForSurahAndGoToSurahPage(searchQuery) {

    browser.setValue(this.selectors.SEARCH_FORM, searchQuery);
    this.wait(1000);
    browser.click(this.selectors.SEARCH_RESULT_LIST);
    return this.getSurahName();

  }

  clickOntheSurahByName(number) {
    const surahs = browser.elements('.row .col-xs-7 span');
    const surahID = surahs.value[number].ELEMENT;
    browser.elementIdClick(surahID);
    this.wait(1000);
    return browser.getUrl();

  }

}
