import * as supertest from 'supertest';
import app from '../../src';

const request = supertest(app);

const successStockData={
    stock_name:"VTbank",
    stock_code:"VT1",
    stock_price:1000,
};
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
        }).mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
            stock_name:"VTbank",
            stock_code:"VT1",
            stock_price:1000,
            set : jest.fn().mockResolvedValueOnce( {
                stock_name:"VTbank",
                stock_code:"VT1",
                stock_price:1000
            }),
            save : jest.fn().mockResolvedValueOnce({
                stock_name:"VTbank",
                stock_code:"VT1",
                stock_price:1000
             }),
        }).mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
            stock_name:"VTbank",
            stock_code:"VT1",
            stock_price:1000,
            destroy: jest.fn().mockResolvedValueOnce( {
                stock_name:"VTbank",
                stock_code:"VT1",
                stock_price:1000
            })
        }).mockResolvedValueOnce(null);;
        static findAll = jest.fn().mockResolvedValueOnce([{
            stock_name:"VTbank",
            stock_code:"VT1",
            stock_price:1000
        }]).mockResolvedValueOnce([])
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
        const result = await request.post('/api/stocks').send(stock);

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
        const result = await request.post('/api/stocks').send(stock);
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
        const result = await request.get('/api/stocks/2');

        expect(result.status).toEqual(200);
        expect(result.body.stock_code).toEqual('132a3');
    })
    it('GET stocks/id - get stock by id but not found', async ()=>{
        const result = await request.get('/api/stocks/1');

        expect(result.status).toEqual(404);
    })
})
describe('PUT STOCK',()=>{
    it('PUT /stocks/:id - put stock is success',async ()=>{
        const stock={
            stock_name:"VTbank",
            stock_code:"VT1",
            stock_price:1000
        };
        const result = await request.put('/api/stocks/4').send(stock);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({...successStockData});
    })
    it('PUT /stocks/:id - put stock but not found', async ()=>{
        const stock = {
            stock_name:"VTbank",
            stock_code:"VT1",
            stock_price:1000
        }
        const result = await request.put('/api/stocks/5').send(stock);
        expect(result.status).toEqual(404);
    })
})
describe("DELETE /stocks/:id",()=>{
    it('DELETE /stocks/:id - destroy stock by id is success', async()=>{
        const result = await request.delete('/api/stocks/3');

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({...successStockData});
    });
    it('DELETE /stocks/:id - destroy stock by id but not found', async ()=>{
        const result = await request.delete('/api/stocks/3');
        expect(result.status).toEqual(404);
    })
})
describe("GET /stocks?code=fpt",()=>{
    it('GET /stocks?where={"stock_code":"FPT"} - get list stocks is success',async ()=>{
        const result = await request.get('/api/stocks?code=fpt');

        expect(result.status).toEqual(200);
        expect(result.body).toEqual([{
            ...successStockData
        }])
    })
    it('GET /stocks?where={"stock_code":"FPT"} - get list return array null',async ()=>{
        const result = await request.get('/api/stocks?code=VP');
        expect(result.status).toEqual(200);
        expect(result.body).toEqual([]);
    })
})