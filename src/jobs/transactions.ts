import * as cron from 'cron';
import logger from '../plugins/logger';
import { EnumTimeZone } from './constants';

const { CronJob } = cron;

const transactionCrawlOption: cron.CronJobParameters = {
  cronTime: '*/15 * * * * *',
  onTick: async () => {
    logger.info(`*** start schedule crawl transaction!`);
  },
  timeZone: EnumTimeZone.ASIA_HO_CHI_MINH
};

export const transactionCrawl = new CronJob(transactionCrawlOption);
