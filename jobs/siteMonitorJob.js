import { Builder, By, Key, until } from 'selenium-webdriver';
import { assert } from 'assert';

const runDriverAndTest = async() => {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://www.google.com/ncr');
    console.log('done hitting site');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    console.log('done sending keys');
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000, "Title did not change");
    console.log('done waiting for title');
  } catch(error) {
    console.error(error);
  } finally {
    await driver.quit();
    console.log('Driver shutdown');
  }
};

export default runDriverAndTest;