const Page = require('./page');

class Temp extends Page {
  getSearchInput() {
    return browser.driver.findElement(by.name('q'));
  }

  search(query) {
    this.getSearchInput().sendKeys(query+'\n');
    return browser.driver.getTitle();
  }

}

module.exports = new Temp();
