import Homepage from '../pageobjects/HomePage';
describe('Home Page', function() {

  let homePage = new Homepage(browser);

  it('Should Have English Heading', async () =>  {
    await homePage.goHome();
    let text = await homePage.getLandingText();
    expect(text).to.equal(`THE NOBLE QUR'AN`);
  });

  it('Should have 114 surahs', async () => {
    let numberSurahs = await homePage.getNumberOfSurahs();
    expect(numberSurahs).to.equal(114);
  });

  it('Should search for surah, click the first result item and land on the surah page', async () => {
    let surahName = await homePage.searchForSurahAndGoToSurahPage('ya-sin');
    expect(surahName).to.equal('YA-SIN (YA SIN) - سورة يس')
  });

  it('Should click a surah from the list of surahs and land on the surah page', async () => {
    await homePage.goHome();
    let url = await homePage.clickOntheSurahByName(1);
    expect(url).to.contain('/1');

  })

});
