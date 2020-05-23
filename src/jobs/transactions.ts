import * as cron from 'cron';
import * as request from 'request-promise';
import { Stocks } from '../models/Stock';
import logger from '../plugins/logger';
import { EnumTimeZone } from './constants';

const { CronJob } = cron;
const callApiCrawl = (stock: Stocks) => {
  const url =
    process.env.POST_CRAWL_URL || 'http://localhost:3000/job/transaction/crawl';

  return request({
    method: 'POST',
    uri: url,
    body: {
      stock_code: stock.stock_code
    },
    json: true
  });
};
const transactionCrawlOption: cron.CronJobParameters = {
  cronTime: '* * 22 * * *',
  onTick: async () => {
    const stocks = await Stocks.findAll();
    const promises = stocks.map(stock => {
      return callApiCrawl(stock);
    });
    await Promise.all(promises);
    logger.info(`*** start schedule crawl transaction!`);
  },
  timeZone: EnumTimeZone.ASIA_HO_CHI_MINH
};

export const transactionCrawl = new CronJob(transactionCrawlOption);
