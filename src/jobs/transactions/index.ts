import * as moment from 'moment';
import * as request from 'request-promise';

import { MOMENT_CONSTANT } from '../../constants/moment';
import { Stocks } from '../../models/Stock';
import { Transactions } from '../../models/transactions';
import logger from '../../plugins/logger';
import { ITransactionCrawl } from './transaction.interface';

const endpoint =
  process.env.ENDPOINT_CRAWL_URL ||
  'https://svr2.fireant.vn/api/Data/Companies/HistoricalQuotes';

const mapTransactions = (
  transactions: ITransactionCrawl[],
  stockId: number
): Transactions[] => {
  return transactions.map(element => {
    return {
      stock_id: stockId,
      close_price: element.PriceClose,
      open_price: element.PriceOpen,
      high_price: element.PriceHigh,
      low_price: element.PriceLow,
      volume: element.Volume,
      exchange_date: new Date(element.Date),
      range_price: element.PriceHigh - element.PriceLow,
      total_value: element.TotalValue,
      foreign_buy_value: element.BuyForeignValue,
      foreign_sell_value: element.SellForeignValue,
      sell_volume: element.SellQuantity,
      buy_volume: element.BuyQuantity,
      foreign_sell_volume: element.SellForeignQuantity,
      foreign_buy_volume: element.BuyForeignQuantity
    } as Transactions;
  });
};

const crawlByStockCode = async (options: {
  stock: Stocks;
  startDate: moment.Moment;
  endDate: moment.Moment;
}): Promise<ITransactionCrawl[]> => {
  try {
    const { stock, startDate, endDate } = options;
    const code = stock.stock_code;
    const startDateStr = startDate.format(MOMENT_CONSTANT.FORMAT);
    const endDateStr = endDate.format(MOMENT_CONSTANT.FORMAT);
    const uri = `${endpoint}?symbol=${code}&startDate=${startDateStr}&endDate=${endDateStr}`;

    return (await request({
      uri,
      json: true
    })) as ITransactionCrawl[];
  } catch (error) {
    throw error;
  }
};

export const crawlTransactionByDay = async (): Promise<void> => {
  try {
    const count = await Stocks.count();

    for (let i = 0; i < count; i += 1) {
      const stock: Stocks = await Stocks.findOne({ offset: i });
      const transactions = await crawlByStockCode({
        stock,
        startDate: moment().utc(),
        endDate: moment().utc()
      });

      if (transactions[0]) {
        const transactionData = mapTransactions(transactions, stock.id);

        const transaction: Transactions = await Transactions.create(
          transactionData[0]
        );
        logger.info(
          `crawl success transaction: ${transaction.exchange_date} for stock code ${stock.stock_code}`
        );
      }
      logger.info(
        `nothing to crawls transaction: for stock code ${stock.stock_code}`
      );
    }

    return;
  } catch (error) {
    logger.error(`[ERR][transaction] ${error}`);
    throw error;
  }
};
