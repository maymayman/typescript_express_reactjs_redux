import * as cron from 'cron';

import logger from '../plugins/logger';
import { EnumTimeZone } from './constants';
import { crawlTransactionByDay } from './transactions';

const { CronJob } = cron;

const transactionCrawlOption: cron.CronJobParameters = {
  cronTime: '*/15 * * * * *',
  onTick: async (): Promise<void> => {
    logger.info(`*** start schedule crawl transaction!`);

    return crawlTransactionByDay();
  },
  timeZone: EnumTimeZone.ASIA_HO_CHI_MINH
};

export const transactionCrawlEveryDay = new CronJob(transactionCrawlOption);
