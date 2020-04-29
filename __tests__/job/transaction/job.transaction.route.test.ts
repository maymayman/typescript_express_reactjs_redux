import * as supertest from 'supertest';
import app from '../../../src';

const request = supertest(app);

const successStockData={
    stock_name:"VTbank",
    stock_code:"VT1",
    stock_price:1000,
};
jest.mock('../../../src/models/', () => ({
    default: {
      Stocks: class {
        static findAll = jest.fn().mockResolvedValueOnce([{
            stock_name:"VTbank",
            stock_code:"VT1",
            stock_price:1000,
        }])
        constructor() {
        } 
      }
    }
  })
);

afterAll(() => {
    jest.resetAllMocks();
});

describe('GET /job/transaction/crawl',()=>{
    it('GET /job/transaction/crawl - get all stocks is success',async ()=>{
        const result = await request.get('/job/transaction/crawl');
        expect(result.body).toEqual([{
            ...successStockData
        }])
    })
})