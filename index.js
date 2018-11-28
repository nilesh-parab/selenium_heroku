const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://www.google.com/ncr');
    console.log('done hitting site');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    console.log('done sending keys');
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    console.log('done waiting for title');
  } finally {
    await driver.quit();
    console.log('Driver shutdown');
  }
})();