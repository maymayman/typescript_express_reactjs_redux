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
        }).mockResolvedValueOnce(null);
        constructor() {
        } 
      }
    }
  })
);

describe('PUT /transactions/:id ',()=>{
    it('PUT transactions/:id - put transaction is success',async ()=>{
        const transaction = {
            volume: "1234",
        };
        const result = await request.put('/transactions/1').send(transaction);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({...successTransactionData});
    });
    it('PUT transaction/:id - put transaction but not found id',async ()=>{
        const transaction = {
            close_price: "21212.121",
            open_price: "12345.12",
        }
        const result = await request.put('/transactions/2').send(transaction);
        expect(result.status).toEqual(404);
    })
}) 