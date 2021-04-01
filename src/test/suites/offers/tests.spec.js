var EC = protractor.ExpectedConditions;

describe('Offers Tests"', function() {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.get(browser.params.applicationEndpoint).then(() => {
      browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.App')), 5000));
    });
	});

  afterEach(() => {
		browser.executeScript('sessionStorage.clear()');
	});

  it("Number of Items in offers != 0", () => {
    browser.driver.executeScript("navigator.geolocation.getCurrentPosition = function(cb){cb({ coords: {accuracy: 20,altitude: null,altitudeAccuracy: null,heading: null,latitude: 19.043192,longitude: 72.86305240000002,speed: null}}); }; window.navigator.geolocation.getCurrentPosition = function(cb){cb({ coords: {accuracy: 20,altitude: null,altitudeAccuracy: null,heading: null,latitude: 19.043192,longitude: 72.86305240000002,speed: null}}); }")
    .then(() => {
      browser.driver.findElement(by.css('#signin')).click().then(() => {
        browser.driver.wait(
          EC.presenceOf(browser.driver.findElement(by.css('#username input')), 5000)).then(() => {
          browser.driver.findElement(by.css('#username input')).sendKeys(browser.params.users[0].username + "\n").then(() => {
            browser.driver.findElement(by.css('#password input')).sendKeys(browser.params.users[0].password + "\n").then(() => {
              browser.driver.findElement(by.css('#login-btn')).click().then(() => {
                browser.driver.findElement(by.css('#offers')).click().then(() => {
                  browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.offer')), 5000)).then(() => {
                    expect(browser.driver.findElements(by.css('.offer')).count()).not.toEqual(0);
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
