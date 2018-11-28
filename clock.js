import { CronJob } from 'cron';
import runDriverAndTest from './worker';

new CronJob('*/2 * * * *', runDriverAndTest, cronCompleted, true);

const cronCompleted = () => {
  console.log('You will see this message every second');
};