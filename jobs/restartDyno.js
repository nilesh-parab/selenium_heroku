import Heroku from 'heroku-client';

const apiToken = (process.env.settings && process.env.settings.HEROKU_API_TOKEN) || process.env.HEROKU_API_TOKEN;
const restartEnabled = (process.env.settings && process.env.settings.cron.restartDyno.enable) || true;

if (restartEnabled && !apiToken) {
  throw 'apiToken not provided';
}

const restartDyno = () => {
  if (restartEnabled) {
    const heroku = new Heroku({ token: apiToken });
    // Application name or id
    const appName = (process.env.settings && process.env.settings.cron.APP_NAME) || process.env.APP_NAME;
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
