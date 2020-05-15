import * as supertest from 'supertest';
import app from '../../../src';

const request = supertest(app);

jest.mock('../../../src/models/', () => ({
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
        static findByPk = jest.fn().mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
            id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z",
            set: jest.fn().mockResolvedValueOnce({
                id: 20,
                user_id: 2,
                session: "NEW_TOKEN",
                updated_at: "2020-03-22T09:01:39.910Z",
                created_at: "2020-03-22T09:01:39.910Z",
                expried_at: "2020-03-29T09:01:39.910Z",
            }),
            save: jest.fn().mockResolvedValueOnce({
                id: 20,
                user_id: 2,
                session: "NEW_TOKEN",
                updated_at: "2020-03-22T09:01:39.910Z",
                created_at: "2020-03-22T09:01:39.910Z",
                expried_at: "2020-03-29T09:01:39.910Z",
            })
        }).mockRejectedValueOnce({
            InternalServerError:'Cannot add or update a child row: a foreign key constraint fails'
        })
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
            id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z",
            set: jest.fn().mockResolvedValueOnce({
                id: 20,
                user_id: 2,
                session: "NEW_TOKEN",
                updated_at: "2020-03-22T09:01:39.910Z",
                created_at: "2020-03-22T09:01:39.910Z",
                expried_at: "2020-03-29T09:01:39.910Z",
            }),
            save: jest.fn().mockResolvedValueOnce({
                id: 20,
                user_id: 2,
                session: "NEW_TOKEN",
                updated_at: "2020-03-22T09:01:39.910Z",
                created_at: "2020-03-22T09:01:39.910Z",
                expried_at: "2020-03-29T09:01:39.910Z",
            })
        }).mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
            id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z",
            destroy: jest.fn().mockResolvedValueOnce({
                id: 20,
                user_id: 2,
                session: "TOKEN_SS",
                updated_at: "2020-03-22T09:01:39.910Z",
                created_at: "2020-03-22T09:01:39.910Z",
                expried_at: "2020-03-29T09:01:39.910Z",
            })
        });
        static findAll = jest.fn().mockResolvedValueOnce([{id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z"}]).
            mockResolvedValueOnce([])
            .mockResolvedValueOnce([{
                id: 20,
                user_id: 2,
                session: "TOKEN_SS",
                updated_at: "2020-03-22T09:01:39.910Z",
                created_at: "2020-03-22T09:01:39.910Z",
                expried_at: "2020-03-29T09:01:39.910Z"
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

describe('POST Session',()=>{
    it('POST /sessions create session valide user_id',async ()=>{
        const sessions = {
            session :"TOKEN_SS"
        };
        const result = await request.post('/api/sessions').send(sessions);

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

        const result = await request.post('/api/sessions').send(sessions);
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

describe("GET SESSIONS",()=>{
    it('GET /session/:id get session but that null or not found',async ()=>{
        const result = await request.get('/api/sessions/10');

        expect(result.status).toEqual(404);
    });
    it('GET /session/:id get session is success',async ()=>{
        const result = await request.get('/api/sessions/20');

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
            id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z"
        })
    })
})

describe('PUT Session',()=>{
    it('PUT /sessions update session with id invalide',async ()=>{
        const sessions ={
            user_id:"15" 
        }
        const result = await request.put('/api/sessions/1').send(sessions);
        expect(result.status).toEqual(500);
        if(result.error){
            expect(result.error.text).toMatchSnapshot();
        }
    })
    it('PUT /sessions update session but session id not found',async ()=>{
        const sessions = {
            user_id:"1",
            session:"TOKEN_SS"
        }
        const result = await request.put('/api/sessions/17').send(sessions);

        expect(result.status).toEqual(404);
    })
    it('PUT /sessions update session is success', async ()=>{
        const sessions = {
            user_id:"1",
            session:"TOKEN_SS"
        }

        const result = await request.put('/api/sessions/1').send(sessions);

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
            id: 20,
            user_id: 2,
            session: "NEW_TOKEN",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z"
        })
    })
})
describe("DELETE SESSIONS",()=>{
    it('DELETE /session/:id - not found user',async ()=>{
        const result = await request.delete('/api/sessions/1');

        expect(result.status).toEqual(404);
    });
    it('DELETE /session/:id - delete user is success',async ()=>{
        const result = await request.delete('/api/sessions/2');

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
            id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z",
        })
    })
})
describe('GET api/sessions?where={"user_id":"2"}',()=>{
    it('GET api/sessions?where="user_id":"2" - get list session is success',async ()=>{
        const result = await request.get('/api/sessions?where={"user_id":"2"}');
        expect(result.body).toEqual([{id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z"
        }])
    })
    it('GET api/session - get list session not found params',async()=>{
        const result = await request.get('/api/sessions');
        expect(result.body).toEqual([]);
    })
    it('GET api/sessions?limit=1&offset=0 - GET list sessions have limit and offset variable',async()=>{
        const result = await request.get('/api/sessions?limit=1&offset=1');
        expect(result.status).toEqual(200);
        expect(result.body).toEqual([{
            id: 20,
            user_id: 2,
            session: "TOKEN_SS",
            updated_at: "2020-03-22T09:01:39.910Z",
            created_at: "2020-03-22T09:01:39.910Z",
            expried_at: "2020-03-29T09:01:39.910Z"
        }])
    })
})

