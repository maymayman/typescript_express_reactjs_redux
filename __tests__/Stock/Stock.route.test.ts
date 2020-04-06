import * as supertest from 'supertest';
import app from '../../src';

const request = supertest(app);

jest.mock('../../src/models/', () => ({
    default: {
      Stocks: class {
        public save = jest.fn().mockResolvedValueOnce({
            stock_code:"132a3",
            stock_name:"viettel",
            stock_price:100.11
        });
        constructor() {
        } 
      }
    }
  })
);

afterAll(() => {
    jest.resetAllMocks();
});

describe('POST STOCK',()=>{
    it('POST /stocks - create stock validate stock_code',async ()=>{
        const stock ={
            stock_name:"viettel",
            stock_price:100.11
        }
        const result = await request.post('/stocks').send(stock);

        expect(result.status).toEqual(400);
        if (result.error) {
            expect(result.error.text).toMatchSnapshot();
        }
    })
    it('POST /stocks - create stock validate success',async ()=>{
        const stock ={
            stock_code:"132a3",
            stock_name:"viettel",
            stock_price:100.11
        }
        const result = await request.post('/stocks').send(stock);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
            stock_code:"132a3",
            stock_name:"viettel",
            stock_price:100.11
        })
    })
})