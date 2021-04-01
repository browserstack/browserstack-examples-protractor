var EC = protractor.ExpectedConditions;

describe('Product Tests"', function() {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.get(browser.params.applicationEndpoint).then(() => {
      browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.css('.App')), 5000));
    });
	});

  afterEach(() => {
		browser.executeScript('sessionStorage.clear()');
	});

  it("Apple And Samsung Filter", () => {
    expect(browser.driver.findElements(by.css('.shelf-item__title')).count()).toEqual(25).then(() => {
      browser.driver.findElement(by.xpath("//span[contains(text(), 'Apple')]")).click().then(() => {
        browser.driver.findElement(by.xpath("//span[contains(text(), 'Samsung')]")).click().then(() => {
          expect(browser.driver.findElements(by.css('.shelf-item')).count()).toEqual(16);
        });
      });
    });
  });

  it("Order By 'Lowest to Highest' prices", () => {
    browser.driver.findElement(by.css(".sort select option[value='lowestprice']")).click().then(() => {
      browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.xpath("//*[@class = 'shelf-item'][1]")), 5000)).then(() => {
        expect(browser.driver.findElement(by.xpath("/html/body/div/div/div/main/div[2]/div[2]/div[3]/div[1]/b")).getText())
        .toEqual('399');
      });
    });
  });

});
