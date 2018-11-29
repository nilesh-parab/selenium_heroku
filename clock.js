import { CronJob } from 'cron';
import { publishJob } from './pubSubMethods'; 
import { MONITOR_JOB_NAME } from './constants';

// TODO: patterns can be configurable
const monitoringJob = new CronJob('*/1 * * * *', () => publishJob(MONITOR_JOB_NAME, Date.now()), null, true);

monitoringJob.start();