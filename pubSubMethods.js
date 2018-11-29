import Redis from 'ioredis';
// TODO: get all channels
import { MONITOR_JOB_NAME, REDIS_URL } from './constants';
import runDriverAndTest from './jobs/siteMonitorJob';

const publishJob = (jobName, publishTime) => {
  try {
    // TODO: configurable via env
    const publisher = new Redis(REDIS_URL);
    console.log(`jobPublisher - Publising a job ${jobName} at time ${new Date(publishTime)}`);
    publisher.publish(jobName, publishTime);
    console.log('Done publishing');
  } catch (err) {
    console.error('jobPublisher - error occurred while publishing job - ', err);
  }
}

const jobDispatcher = (channel, message) => {
  switch(channel) {
    case MONITOR_JOB_NAME:
      runDriverAndTest();
    default:
      console.warn(`jobSubscriber - unknown channel ${channel}`);
  }
}

export { publishJob, jobDispatcher };