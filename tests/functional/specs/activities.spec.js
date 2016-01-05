module.exports = {
  'can view activities page': function(client) {
    var index = client.page.activities();

    index.navigate()
      .waitForElementVisible('body', 2000)
      .assert.title('React Redux Example');

    client.end();
  }
}
