import * as cron from 'cron';
import * as moment from 'moment';
import * as request from 'request-promise';
import logger from '../plugins/logger';
import { EnumTimeZone } from './constants';
const { CronJob } = cron;
let nowDate = moment().format('YYYY-MM-DD');
let startWasDate = moment()
  .subtract(10, 'years')
  .format('YYYY-MM-DD');
let endWasDate = moment()
  .add(10, 'days')
  .format('YYYY-MM-DD');

interface ICrawlURL {
  startDate?: string;
  endDate?: string;
}
const jobCrawlUrl = async (option: ICrawlURL) => {
  const { startDate, endDate } = option;
  const host =
    process.env.HOST || 'http://localhost:3000/job/transaction/crawl';
  if (!startDate || endWasDate) {
    return host;
  }

  return `${host}?startDate=${startDate}&endDate=${endDate}`;
};
const callApiCrawl = async (option: ICrawlURL) => {
  const { startDate, endDate } = option;
  const urlcrawltransaction = await jobCrawlUrl({ startDate, endDate });
  await request({
    uri: urlcrawltransaction,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  });
};

const transactionCrawlOption: cron.CronJobParameters = {
  cronTime: '* * 22 * * *',
  onTick: async () => {
    await callApiCrawl({ startDate: nowDate });
    await callApiCrawl({ startDate: startWasDate, endDate: endWasDate });
    if (endWasDate < nowDate) {
      nowDate = moment().format('YYYY-MM-DD');
      startWasDate = moment()
        .subtract(10, 'years')
        .add(11, 'days')
        .format('YYYY-MM-DD');
      endWasDate = moment()
        .subtract(10, 'years')
        .add(21, 'days')
        .format('YYYY-MM-DD');
    }
    logger.info(`*** start schedule crawl transaction!`);
  },
  timeZone: EnumTimeZone.ASIA_HO_CHI_MINH
};

export const transactionCrawl = new CronJob(transactionCrawlOption);
