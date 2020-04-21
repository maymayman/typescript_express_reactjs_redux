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
        const result = await request.post('/transactions').send(transaction);
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
        const result = await request.post('/transactions').send(transaction);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({...successTransactionData})
    })
})