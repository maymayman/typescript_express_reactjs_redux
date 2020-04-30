import { Request, Response } from 'express';
import * as moment from 'moment';
import * as rp from 'request-promise';
import * as Models from '../../models';

const Stocks = Models.default.Stocks;

interface IUrlCrawl {
  stockCode: string;
  startDate: string;
  endDate: string;
}
const urlCrawl = (options: IUrlCrawl): string => {
  const { startDate, endDate, stockCode } = options;
  const endpoint =
    process.env.ENDPOINT_CRAWL_URL ||
    'https://svr2.fireant.vn/api/Data/Markets/HistoricalQuotes';

  return `${endpoint}/symbol=${stockCode}&startDate=${startDate}&endDate=${endDate};`;
};
const crawlByStockCode = async options => {
  const { element, startDate, endDate } = options;
  const urlByStockCode = urlCrawl({
    startDate,
    endDate,
    stockCode: element.stock_code
  });
  const transactions = await rp({
    uri: urlByStockCode,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  });
  transactions.forEach(async transaction => {
    await rp({
      method: 'POST',
      url: 'http://localhost:3000/api/transactions',
      body: {
        stock_id: element.id.toString(),
        close_price: transaction.Close,
        open_price: transaction.Open,
        high_price: transaction.High,
        low_price: transaction.Low,
        volume: transaction.Volume,
        exchange_date: transaction.Date
      },
      json: true
    });
  });
};

export default {
  crawl: async (req: Request, res: Response) => {
    const stock = await Stocks.findAll();
    const startDate = req.query.startDate
      ? moment(req.query.startDate).format('YYYY-MM-DDD')
      : moment().format('YYYY-MM-DDD');
    const endDate = req.query.endDate
      ? moment(req.query.endDate).format('YYYY-MM-DDD')
      : moment().format('YYYY-MM-DDD');

    stock.forEach(async element => {
      await crawlByStockCode({
        element,
        startDate,
        endDate
      });
    });

    return res.json(stock);
  }
};
