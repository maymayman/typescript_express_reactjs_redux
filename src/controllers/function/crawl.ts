import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as moment from 'moment';
import * as request from 'request-promise';
import { NUMBER_SUBTRACT_MOMENT, RANGE_DAY_CRAWL } from '../../../config';
import {
  ERROR_CODES,
  formatDate,
  HTTP_ERRORS,
  MOMENT_CONSTANT,
  QUERY_CONSTANT
} from '../../constants';
import * as Models from '../../models';
import { Stocks } from '../../models/Stock';

const { DAYS, YEARS, FORMAT } = MOMENT_CONSTANT;
const { SORT_BY, SORT } = QUERY_CONSTANT;

interface IUrlCrawl {
  startDate: string;
  endDate: string;
  stockCode: string;
}
interface IcrawlByStockCode {
  stock: Stocks;
  startDate: string;
  endDate: string;
}
interface ITransactionPayload {
  stock_id: number;
  close_price: number;
  open_price: number;
  high_price: number;
  low_price: number;
  volume: number;
  exchange_date: string;
}
const urlCrawl = (options: IUrlCrawl): string => {
  const { startDate, endDate, stockCode } = options;
  const endpoint =
    process.env.ENDPOINT_CRAWL_URL ||
    'https://svr2.fireant.vn/api/Data/Markets/HistoricalQuotes';

  return `${endpoint}?symbol=${stockCode}&startDate=${startDate}&endDate=${endDate}`;
};

const insertTransaction = async (transaction: ITransactionPayload) => {
  try {
    const queryTransaction = await Models.default.Transactions.findOne({
      where: {
        stock_id: transaction.stock_id,
        exchange_date: transaction.exchange_date
      }
    });
    if (!queryTransaction) {
      const classTransaction = new Models.default.Transactions(transaction);

      await classTransaction.save();
    }

    return true;
  } catch (err) {
    throw err;
  }
};
const insertTransactions = (transactions: ITransactionPayload[]) => {
  return transactions.map(transaction => {
    return insertTransaction(transaction);
  });
};
const filterData = (el: ITransactionPayload) => {
  return (
    el.stock_id &&
    el.close_price &&
    el.open_price &&
    el.high_price &&
    el.low_price &&
    el.volume &&
    el.exchange_date
  );
};
const formatDataCrawl = (
  transactions: any,
  stockID: number
): ITransactionPayload[] => {
  return transactions
    .map(element => {
      return {
        stock_id: stockID,
        close_price: element.Close || 0,
        open_price: element.Open || 0,
        high_price: element.High || 0,
        low_price: element.Low || 0,
        volume: element.Volume || 0,
        exchange_date: element.Date || ''
      };
    })
    .filter(filterData);
};
const crawlByStockCode = async (options: IcrawlByStockCode) => {
  const { stock, startDate, endDate } = options;
  const urlCrawlTransaction = urlCrawl({
    startDate,
    endDate,
    stockCode: stock.stock_code
  });
  const transactions = await request({
    uri: urlCrawlTransaction,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  });
  const formatTransaction = formatDataCrawl(transactions, stock.id);

  const result = insertTransactions(formatTransaction);

  return Promise.all(result);
};
const getRangeDateTransactions = async (stock: Stocks) => {
  const transaction = await Models.default.Transactions.findOne({
    where: { stock_id: stock.id },
    order: [[SORT_BY, SORT]]
  });
  const startDate = !transaction
    ? formatDate({
        date: moment()
          .subtract(NUMBER_SUBTRACT_MOMENT, YEARS)
          .toString()
      })
    : formatDate({
        date: moment(transaction.exchange_date)
          .add(1, DAYS)
          .format(FORMAT)
      });
  const endDate = formatDate({
    date: moment(startDate)
      .add(RANGE_DAY_CRAWL, DAYS)
      .toString()
  });

  return { startDate, endDate };
};

export default {
  crawl: async (req: Request, res: Response) => {
    const stock_code = req.body.stock_code;
    const stock: Stocks = await Stocks.findOne({
      where: { stock_code }
    });

    if (!stock) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.STOCK_NOT_FOUND].MESSAGE
      );
    }
    const { startDate, endDate } = await getRangeDateTransactions(stock);
    const promises = await crawlByStockCode({ stock, startDate, endDate });

    const result = await Promise.all(promises);

    return res.json(result);
  }
};
