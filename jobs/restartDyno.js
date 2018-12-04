import Heroku from 'heroku-client';
import { SETTINGS } from '../constants';

const apiToken = (SETTINGS && SETTINGS.HEROKU_API_TOKEN) || process.env.HEROKU_API_TOKEN;
const restartEnabled = (SETTINGS && SETTINGS.cron.restartDyno.enable) || true;
// Application name or id
const appName = (SETTINGS && SETTINGS.cron.restartDyno.APP_NAME) || process.env.APP_NAME;

if (restartEnabled && !apiToken) {
  throw 'apiToken not provided';
}

const restartDyno = () => {
  if (restartEnabled) {
    const heroku = new Heroku({ token: apiToken });
    heroku.delete(`/apps/${appName}/dynos`).then(app => {
        console.log(`Dyno for ${appName} restarted`);
    }).catch((err) => {
        console.error(err);
    });
  } else {
    console.warn('Dyno restarts are disabled.');
  }
}

export default restartDyno;
