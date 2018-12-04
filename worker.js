import Redis from 'ioredis';
import { jobDispatcher } from './pubSubMethods';
import { MONITOR_JOB_NAME, REDIS_URL, RESTART_DYNO } from './constants';

const subscriber = new Redis(REDIS_URL);

subscriber.subscribe(MONITOR_JOB_NAME, RESTART_DYNO, (err, count) => {
  if(err) {
    console.error('jobSubscriber - error occurred while subsribing to channels - ', err);
    return;
  }
  console.log(`jobSubscriber - subscribed to ${count} channels`);
});

subscriber.on('message', jobDispatcher);

export default jobDispatcher;