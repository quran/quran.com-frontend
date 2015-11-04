module.exports = {
  'can view index page': function(client) {
    var index = client.page.index();

    index.navigate()
      .waitForElementVisible('body', 2000)
      .assert.title("The Noble Qur'an - القرآن الكريم");

    index.expect.element('@indexHeader').to.be.present;
    index.expect.element('@surahList').to.be.present;
    index.expect.element('@indexHeader').to.be.present;

    client.end();
  },

  'can view surah list': function(client) {
    var index = client.page.index();

    index.navigate();

    index.expect.element('@surahList').to.be.present;
    index.expect.element('@firstSurah').to.be.present;
    index.expect.element('@lastSurah').to.be.present;

    index.expect.element('@firstSurah').text.to.contain('THE OPENER');
    index.expect.element('@firstSurah').text.to.contain('Al-Fatihah');
    index.expect.element('@lastSurah').text.to.contain('THE MANKIND');
    index.expect.element('@lastSurah').text.to.contain('An-Nas');

    client.end();
  }
}
