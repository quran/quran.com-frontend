import Homepage from '../pageobjects/HomePage';
describe('Home Page', () => {

  const homePage = new Homepage(browser);

  it('Should Have English Heading', () => {
    homePage.goHome();
    const text = homePage.getLandingText();
    expect(text).to.equal('THE NOBLE QUR\'AN');
  });

  it('Should have 114 surahs', () => {
    const numberSurahs = homePage.getNumberOfSurahs();
    expect(numberSurahs).to.equal(114);
  });

  it('Should search for surah, click the first result item and land on the surah page', () => {
    const surahName = homePage.searchForSurahAndGoToSurahPage('ya-sin');
    expect(surahName).to.equal('YA-SIN (YA SIN) - سورة يس');
  });

  it('Should click a surah from the list of surahs and land on the surah page', () => {
    homePage.goHome();
    const url = homePage.clickOntheSurahByName(1);
    expect(url).to.contain('/1');

  });

});
