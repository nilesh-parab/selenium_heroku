import { CronJob, CronTime } from 'cron';
import { publishJob } from './pubSubMethods';
import { MONITOR_JOB_NAME, RESTART_DYNO } from './constants';

const monitoringJobSchedule = (process.env.settings && process.env.settings.cron.monitoring.schedule) || process.env.MONITOR_JOB_SCHEDULE || '*/1 * * * *'; //Every minute
const restartDynoSchedule = (process.env.settings && process.env.settings.cron.restartDyno.schedule) || process.env.RESTART_DYNO_SCHEDULE || '* */12 * * *'; // Every 12 hours
const monitorEnabled = (process.env.settings && process.env.settings.cron.monitoring.enable) || true;
const restartEnabled = (process.env.settings && process.env.settings.cron.restartDyno.enable) || true;

if (monitorEnabled) {
    const cronTimeMonitor = new CronTime(monitoringJobSchedule);
    const monitoringJob = new CronJob(cronTimeMonitor.source, () => publishJob(MONITOR_JOB_NAME, Date.now()), null, true);
    console.log('monitoringJob Scheduled');
    monitoringJob.start();
}

if (restartEnabled) {
    const cronTimeRestartDyno = new CronTime(restartDynoSchedule);
    const restartDyno = new CronJob(cronTimeRestartDyno.source, () => publishJob(RESTART_DYNO, Date.now()), null, true);
    console.log('restartDyno Scheduled');
    restartDyno.start();
}
