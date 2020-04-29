import { Request, Response } from 'express';
import * as rp from 'request-promise';
import * as Models from '../../models';

const Stocks = Models.default.Stocks;
const url = {
  FPT:
    'https://svr2.fireant.vn/api/Data/Markets/HistoricalQuotes?symbol=FPT&startDate=2020-1-20&endDate=2020-4-19'
};

export default {
  crawl: async (req: Request, res: Response) => {
    const stock = await Stocks.findAll();

    stock.forEach(async element => {
      if (url[element.stock_code]) {
        const transactions = await rp({
          uri: url[element.stock_code],
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
      }
    });

    return res.json(stock);
  }
};
