import * as supertest from 'supertest';
import app from '../../src';

const request = supertest(app);

jest.mock('../../src/models/', () => ({
    default: {
      Sessions: class {
        public save = jest.fn().mockResolvedValueOnce({
            id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z"
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

describe('POST Session',()=>{
    it('POST /sessions create session valide user_id',async ()=>{
        const sessions = {
            session :"TOKEN_SS"
        };
        const result = await request.post('/sessions').send(sessions);

        expect(result.status).toEqual(400);
        if (result.error) {
         expect(result.error.text).toMatchSnapshot();
        }
    })
    it('POST /sessions create sessions valide success', async ()=>{
        const sessions = {
            user_id:"1",
            session:"TOKEN_SS"
        }

        const result = await request.post('/sessions').send(sessions);
        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
            id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z"
        })
    });
})