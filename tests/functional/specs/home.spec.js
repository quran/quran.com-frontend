module.exports = {
  'can view and click regions from dropdown': function(client) {
    client.maximizeWindow();

    var home = client.page.home();

    home.navigate().waitForElementVisible('body', 5000)

    home.expect.element('@title').to.be.present;
    home.expect.element('@title').text.to.contain('React Redux Example');

    home.expect.element('@regionDropdown').to.be.present;
    home.expect.element('@regionDropdown').text.to.contain('Explore');

    home.moveToElement('@regionDropdown', 5, 5, function(response) {
      home.expect.element('@popover').to.be.present;

      home.moveToElement('@popover', 5, 5, function(response) {
        home.expect.element('@popover').to.be.present;
      });

      client.expect.element('.navbar-brand').to.be.present;

      client.moveToElement('.navbar-brand', 0, 0, function(response) {
        home.waitForElementNotPresent('@popover', 1000);
      });
    });

    client.end();
  }
}
