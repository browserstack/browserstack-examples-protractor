var EC = protractor.ExpectedConditions;

describe('User Tests"', function() {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.get(browser.params.applicationEndpoint).then(() => {
      browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.App')), 5000));
    });
	});

  afterEach(() => {
		browser.executeScript('sessionStorage.clear()');
	});

  it("Number of orders != 0", () => {
    browser.driver.findElement(by.css('#signin')).click().then(() => {
      browser.driver.wait(
        EC.presenceOf(browser.driver.findElement(by.css('#username input')), 5000)).then(() => {
        browser.driver.findElement(by.css('#username input')).sendKeys(browser.params.users[3].username + "\n").then(() => {
          browser.driver.findElement(by.css('#password input')).sendKeys(browser.params.users[3].password + "\n").then(() => {
            browser.driver.findElement(by.css('#login-btn')).click().then(() => {
              browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.username')), 5000)).then(() => {
                expect(browser.driver.findElement(by.css('.username')).getText()).toEqual(browser.params.users[3].username).then(() => {
                  browser.driver.findElement(by.css('#orders')).click().then(() => {
                    expect(browser.driver.findElements(by.css('.order')).count()).not.toEqual(0);
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  it("Number of favouriters != 0", () => {
    browser.driver.findElement(by.css('#signin')).click().then(() => {
      browser.driver.wait(
        EC.presenceOf(browser.driver.findElement(by.css('#username input')), 5000)).then(() => {
        browser.driver.findElement(by.css('#username input')).sendKeys(browser.params.users[0].username + "\n").then(() => {
          browser.driver.findElement(by.css('#password input')).sendKeys(browser.params.users[0].password + "\n").then(() => {
            browser.driver.findElement(by.css('#login-btn')).click().then(() => {
              browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.username')), 5000)).then(() => {
                expect(browser.driver.findElement(by.css('.username')).getText()).toEqual(browser.params.users[0].username).then(() => {
                  browser.driver.findElement(by.xpath("//p[text() = 'iPhone 12']/../div/button")).click().then(() => {
                    browser.driver.findElement(by.css('#favourites')).click().then(() => {
                      expect(browser.driver.findElement(by.css('p.shelf-item__title')).getText()).toEqual('iPhone 12');
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  it("Item Images not available for 'image_not_loading_user'", () => {
    browser.driver.findElement(by.css('#signin')).click().then(() => {
      browser.driver.wait(
        EC.presenceOf(browser.driver.findElement(by.css('#username input')), 5000)).then(() => {
        browser.driver.findElement(by.css('#username input')).sendKeys(browser.params.users[2].username + "\n").then(() => {
          browser.driver.findElement(by.css('#password input')).sendKeys(browser.params.users[2].password + "\n").then(() => {
            browser.driver.findElement(by.css('#login-btn')).click().then(() => {
              browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.username')), 5000)).then(() => {
                expect(browser.driver.findElement(by.css('.username')).getText()).toEqual(browser.params.users[2].username);
              });
            });
          });
        });
      });
    });
  });

});
