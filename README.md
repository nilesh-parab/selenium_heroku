# selenium_heroku
selenium_heroku is job scheduler for Node.js. It allows you to schedule jobs (arbitrary functions) for execution at specific dates, time, every minute. You can schedule more the one task, in clock.js file to execute and worker.js will be listening to the redis and once the job is dispatched worker will publish the requested job. clock and worker file will be connected through redis.

## Project Structure

#### /jobs

 This folder contains all jobs related logic files. This is the business logic to be executed by worker.
 
#### Procfile 
 
Mechanism for declaring Heroku process types & entry points run by your application.
 
#### clock.js

Schedules jobs, publishes messages to redis.

#### constants.js

Constants used across the application.

#### pubSubMethods.js

Utility  methods to publish / subscribe messages in Redis.
 
## Getting started

### Deploying on heroku

* Create an app in heroku.
* Add following buildpacks:
  * [Chrome Driver](https://github.com/heroku/heroku-buildpack-chromedriver.git) for [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) package. Refer buildpack for any specific configurations.
  * [Chrome Browser](https://github.com/heroku/heroku-buildpack-google-chrome.git) for [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) package. Refer buildpack for any specific configurations.
  * [Nodejs Buildpack](https://github.com/heroku/heroku-buildpack-nodejs.git) for running Node on Heroku. Refer buildpack for any specific configurations.
* Create `settings` environment variable using `heroku-config-sample.json`.
* Create `REDIS_URL` environment & point to your REDIS instance.

### Executing locally

* After cloning the project please execute 
   `npm install`
* Install `babel-cli` globally using
   ```npm install -g babel-cli```
* Download [chromedriver](http://chromedriver.chromium.org/downloads) for your platform.
* Open 2 terminals & set following in environment,
  * `Path=/path-to-where-chromedriver-extracted`
  * `REDIS_URL=redis://:@127.0.0.1:<PORT>/4`
  * `HEROKU_API_TOKEN=heroku-access-token`
  * `APP_NAME=heroku-app-name`
  * `MONITOR_JOB_SCHEDULE=*/1 * * * *`
  * `RESTART_DYNO_SCHEDULE=*/1 * * * *`
  * `MONITORING_ENABLE=false`
  * `RESTART_DYNO_ENABLE=false`
* Run clock process on one of the terminal using command `babel-node clock.js --presets latest`.
* Run worker process on other terminal using command `babel-node worker.js --presets latest`.

## Additional Resources

* For cron expressions, you can use [cron.guru](https://crontab.guru/) 
* For webdriver API, use [selenium-webdriver](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html)
* For cron, refer [package](https://www.npmjs.com/package/cron)
* [Heroku Nodejs Buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
* [Heroku Chromedriver](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-chromedriver)
* [Heroku Chrome](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-google-chrome)
