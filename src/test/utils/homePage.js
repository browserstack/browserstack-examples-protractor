const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */

  open() {
    return super.open('');
  }

  openGoogle() {
    return super.open('https://google.com/ncr');
  }
}

module.exports = new HomePage();
