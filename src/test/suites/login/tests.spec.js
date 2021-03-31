var EC = protractor.ExpectedConditions;

describe('Login Tests"', function() {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.get(browser.params.applicationEndpoint).then(() => {
      browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.App')), 5000));
    });
	});

  afterEach(() => {
		browser.executeScript('sessionStorage.clear()');
	});

  it("Locked Account Test", () => {
    browser.driver.findElement(by.css('#signin')).click().then(() => {
      browser.driver.wait(
        EC.presenceOf(browser.driver.findElement(by.css('#username input')), 5000)).then(() => {
        browser.driver.findElement(by.css('#username input')).sendKeys(browser.params.users[1].username + "\n").then(() => {
          browser.driver.findElement(by.css('#password input')).sendKeys(browser.params.users[1].password + "\n").then(() => {
            browser.driver.findElement(by.css('#login-btn')).click().then(() => {
              browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.api-error')), 5000)).then(() => {
                expect(browser.driver.findElement(by.css('.api-error')).getText()).toEqual('Your account has been locked.');
              });
            });
          });
        });
      });
    });
	});

  it("Navigate to Favourites Fails", () => {
    browser.driver.findElement(by.css('#favourites')).click().then(() => {
      browser.wait(EC.urlIs(browser.params.applicationEndpoint + '/signin?favourites=true'), 5000);
    });
	});

});
