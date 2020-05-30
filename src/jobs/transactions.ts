import * as cron from 'cron';
import * as request from 'request-promise';
import { FUNCTION_CRAWL_URL } from '../../config';
import { Stocks } from '../models/Stock';
import logger from '../plugins/logger';
import { EnumTimeZone } from './constants';

const { CronJob } = cron;
const callApiCrawl = (stock: Stocks) => {
  return request({
    method: 'POST',
    uri: FUNCTION_CRAWL_URL,
    body: {
      stock_code: stock.stock_code
    },
    json: true
  });
};
const urlGetStock = (limit: number, offset: number): string => {
  const endpoint =
    process.env.ENDPOINT_GET_STOCKS_URL || 'http://localhost:3000/api/stocks';

  return `${endpoint}?limit=${limit}&offset=${offset}`;
};
const callApiStock = async (url: string) => {
  return request({
    method: 'GET',
    uri: url,
    json: true
  });
};
const loop = async (limit, offset) => {
  const urlStocks = urlGetStock(limit, offset);
  const stocks = await callApiStock(urlStocks);

  if (stocks.length > 0) {
    const promises = stocks.map(stock => {
      return callApiCrawl(stock);
    });
    await Promise.all(promises);
    const nextPage = offset + limit;
    await loop(limit, nextPage);
  }

  return;
};

const transactionCrawlOption: cron.CronJobParameters = {
  cronTime: '*/15 * * * * *',
  onTick: async () => {
    const limit = 5;
    const offset = 0;
    await loop(limit, offset);
    logger.info(`*** start schedule crawl transaction!`);
  },
  timeZone: EnumTimeZone.ASIA_HO_CHI_MINH
};

export const transactionCrawl = new CronJob(transactionCrawlOption);
