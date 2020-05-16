import * as supertest from 'supertest';
import app from '../../src';

const request = supertest(app);
const successData ={
    id: 127,
    stock_id: 1,
    close_price: 50400,
    open_price: 50200,
    high_price: 50900,
    low_price: 49800,
    volume: 849590,
    exchange_date: "2020-05-04T00:00:00.000Z",
    updated_at: "2020-05-04T07:43:27.328Z",
    created_at: "2020-05-04T07:43:27.328Z"
}
jest.mock('request-promise',()=>(jest.fn().mockResolvedValue([{
    Symbol: "FPT",
    Close: 50700.0,
    Open: 51500.0,
    High: 51500.0,
    Low: 50500.0,
    Volume: 1419750.0,
    Value: 0.0,
    Date: "2020-04-27T00:00:00Z",
    OpenInt: 0.0      
}])))
jest.mock('../../src/models/',()=>({
    default: {
        Transactions:class {
            public save = jest.fn().mockResolvedValueOnce({
                ...successData     
            }).mockResolvedValueOnce({
                id: 127,
                stock_id: 1,
                close_price: 50400,
                open_price: 50200,
                high_price: 50900,
                low_price: 49800,
                volume: 849590,
                exchange_date: "2020-05-04T00:00:00.000Z",
                updated_at: "2020-05-04T07:43:27.328Z",
                created_at: "2020-05-04T07:43:27.328Z"
            })
            static findOne = jest.fn().mockResolvedValueOnce(null)
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({
                id: 127,
                stock_id: 1,
                close_price: 50400,
                open_price: 50200,
                high_price: 50900,
                low_price: 49800,
                volume: 849590,
                exchange_date: "2020-05-04T00:00:00.000Z",
                updated_at: "2020-05-04T07:43:27.328Z",
                created_at: "2020-05-04T07:43:27.328Z"
            })
        }
    }
}))
jest.mock('../../src/models/Stock',()=>({
    Stocks:class {
        static findOne = jest.fn().mockResolvedValueOnce({
            id:1,
            stock_name:"FPT",
            stock_code:"FPT",
            stock_price:1000,
        }).mockResolvedValueOnce({
            id:1,
            stock_name:"FPT",
            stock_code:"FPT",
            stock_price:1000,
        }).mockResolvedValueOnce({
            id:1,
            stock_name:"FPT",
            stock_code:"FPT",
            stock_price:1000,
        })
        }
    })
)
afterAll(() => {
    jest.resetAllMocks();
});
describe('GET /job/transaction/crawl',()=>{
    it('GET /job/transaction/crawl - crawl Transaction call api is success',async()=>{
        const result = await request.post('/job/transaction/crawl?&startDate=2020-04-25&endDate=2020-05-01').send({stock_code:'FPT'});
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(
            
                [
                    {
                        id: 127,
                        stock_id: 1,
                        close_price: 50400,
                        open_price: 50200,
                        high_price: 50900,
                        low_price: 49800,
                        volume: 849590,
                        exchange_date: "2020-05-04T00:00:00.000Z",
                        updated_at: "2020-05-04T07:43:27.328Z",
                        created_at: "2020-05-04T07:43:27.328Z"
                    }
                ]
            
        )
    })
    it('GET /job/transaction/crawl - crawl Transaction call api with start and end date today is success',async()=>{
        const result = await request.post('/job/transaction/crawl').send({stock_code:'FPT'});
         expect(result.status).toEqual(200);
         expect(result.body).toEqual(
             [ 
                     {
                        id: 127,
                        stock_id: 1,
                        close_price: 50400,
                        open_price: 50200,
                        high_price: 50900,
                        low_price: 49800,
                        volume: 849590,
                        exchange_date: "2020-05-04T00:00:00.000Z",
                        updated_at: "2020-05-04T07:43:27.328Z",
                        created_at: "2020-05-04T07:43:27.328Z"
                    }
            ]
        )
    })
    it('GET /job/transaction/crawl - crawl Transaction by the api call but transaction was  already exists',async()=>{
        const result = await request.post('/job/transaction/crawl').send({stock_code:'FPT'});
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(
             [ true ] 
       )
    })
})
