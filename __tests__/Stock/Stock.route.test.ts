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
        static findByPk = jest.fn().mockResolvedValueOnce({
            stock_code:"132a3",
            stock_name:"viettel",
            stock_price:100.11
        }).mockResolvedValueOnce(null);
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
describe('GET /stocks/id ',()=>{
    it('GET /stocks/id - find stock by id is success',async ()=>{
        const result = await request.get('/stocks/2');

        expect(result.status).toEqual(200);
        expect(result.body.stock_code).toEqual('132a3');
    })
    it('GET stocks/id - get stock by id but not found', async ()=>{
        const result = await request.get('/stocks/1');

        expect(result.status).toEqual(404);
    })
})