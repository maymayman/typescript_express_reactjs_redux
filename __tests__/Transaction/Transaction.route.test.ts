import * as supertest from 'supertest';
import app from '../../src';

const request = supertest(app);

const successTransactionData={
    stock_id: "2",
    close_price: "21212.121",
    open_price: "12345.12",
    high_price: "12124.13",
    low_price: "12354.45",
    volume: "1234",
    exchange_date: "2020-04-20T13:19:05.555Z",
    updated_at: "2020-04-21T13:30:24.086Z",
    created_at: "2020-04-21T13:30:24.086Z"
};

jest.mock('../../src/models/', () => ({
    default: {
      Transactions: class {
        public save = jest.fn().mockResolvedValueOnce({
            stock_id: "2",
            close_price: "21212.121",
            open_price: "12345.12",
            high_price: "12124.13",
            low_price: "12354.45",
            volume: "1234",
            exchange_date: "2020-04-20T13:19:05.555Z",
            updated_at: "2020-04-21T13:30:24.086Z",
            created_at: "2020-04-21T13:30:24.086Z"
        });
        static findByPk = jest.fn().mockResolvedValueOnce({
            stock_id: "2",
            close_price: "21212.121",
            open_price: "12345.12",
            high_price: "12124.13",
            low_price: "12354.45",
            volume: "1234",
            exchange_date: "2020-04-20T13:19:05.555Z",
            updated_at: "2020-04-21T13:30:24.086Z",
            created_at: "2020-04-21T13:30:24.086Z",
            set: jest.fn().mockResolvedValueOnce({
                stock_id: "2",
                close_price: "21212.121",
                open_price: "12345.12",
                high_price: "12124.13",
                low_price: "12354.45",
                volume: "1234",
                exchange_date: "2020-04-20T13:19:05.555Z"
            }),
            save: jest.fn().mockResolvedValueOnce({
                stock_id: "2",
                close_price: "21212.121",
                open_price: "12345.12",
                high_price: "12124.13",
                low_price: "12354.45",
                volume: "1234",
                exchange_date: "2020-04-20T13:19:05.555Z",
                updated_at: "2020-04-21T13:30:24.086Z",
                created_at: "2020-04-21T13:30:24.086Z",
            })
        }).mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
            stock_id: "2",
            close_price: "21212.121",
            open_price: "12345.12",
            high_price: "12124.13",
            low_price: "12354.45",
            volume: "1234",
            exchange_date: "2020-04-20T13:19:05.555Z",
            updated_at: "2020-04-21T13:30:24.086Z",
            created_at: "2020-04-21T13:30:24.086Z",
        }).mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
            stock_id: "2",
            close_price: "21212.121",
            open_price: "12345.12",
            high_price: "12124.13",
            low_price: "12354.45",
            volume: "1234",
            exchange_date: "2020-04-20T13:19:05.555Z",
            updated_at: "2020-04-21T13:30:24.086Z",
            created_at: "2020-04-21T13:30:24.086Z",
            destroy: jest.fn().mockResolvedValueOnce({
                stock_id: "2",
                close_price: "21212.121",
                open_price: "12345.12",
                high_price: "12124.13",
                low_price: "12354.45",
                volume: "1234",
                exchange_date: "2020-04-20T13:19:05.555Z",
                updated_at: "2020-04-21T13:30:24.086Z",
                created_at: "2020-04-21T13:30:24.086Z",
            })
        }).mockResolvedValueOnce(null);
        constructor() {
        } 
      }
    }
  })
);

describe('POST /transactions ',()=>{
    it('POST /transactions - create transaction validate close_price not be number',async ()=>{
        const transaction ={
            stock_id: "2",
            close_price: "21212.121",
            open_price: "hihihi",
            high_price: "12124.13",
            low_price: "12354.45",
            volume: "1234",
            exchange_date: "2020-04-20T13:19:05.555Z"
        };
        const result = await request.post('/api/transactions').send(transaction);
        expect(result.status).toEqual(400);
        if (result.error) {
        expect(result.error.text).toMatchSnapshot();
        }
    })
    it('POST /transactions - create transaction is success',async ()=>{
        const transaction ={
            stock_id: "2",
            close_price: "21212.121",
            open_price: "12345.12",
            high_price: "12124.13",
            low_price: "12354.45",
            volume: "1234",
            exchange_date: "2020-04-20T13:19:05.555Z",
        };
        const result = await request.post('/api/transactions').send(transaction);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({...successTransactionData})
    })
})
describe('PUT /transactions/:id ',()=>{
    it('PUT transactions/:id - put transaction is success',async ()=>{
        const transaction = {
            volume: "1234",
        };
        const result = await request.put('/api/transactions/1').send(transaction);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({...successTransactionData});
    });
    it('PUT transaction/:id - put transaction but not found id',async ()=>{
        const transaction = {
            close_price: "21212.121",
            open_price: "12345.12",
        }
        const result = await request.put('/api/transactions/2').send(transaction);
        expect(result.status).toEqual(404);
    })
})
describe('GET /transactions/:id ',()=>{
    it('GET /transactions/:id - get by id is success',async()=>{
        const result = await request.get('/api/transactions/3');
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({...successTransactionData});
    })
    it('GET /transactions/:id - get transaction by id is not found',async()=>{
        const result = await request.get('/api/transactions/4');
        expect(result.status).toEqual(404);
    })
});
describe('DELETE /transactions/:id ',()=>{
    it('DELETE /transaction/:id - delete transaction is success',async()=>{
        const result = await request.delete('/api/transactions/5');
        expect(result.status).toEqual(200);
        expect({...successTransactionData});
    });
    it('DELETE transactions/:id - delete transaction by id is not found',async ()=>{
        const result = await request.delete('/api/transactions/6');
        expect(result.status).toEqual(404);
    })
})