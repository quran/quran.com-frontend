import BasePage from './BasePage';
import selectors from './selectors';

export default class HomePage extends BasePage {
  constructor() {
    super(selectors);
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
    browser.waitForVisible(this.selectors.SEARCH_RESULT_LIST);
    browser.click(this.selectors.SEARCH_RESULT_LIST);
    return this.getSurahName();
  }

  clickOntheSurahByNumber(number) {
    const surahs = browser.elements('.row .col-xs-7 span');
    const chapterId = surahs.value[number].ELEMENT;
    browser.elementIdClick(chapterId);
    return browser.getUrl();
  }
}
