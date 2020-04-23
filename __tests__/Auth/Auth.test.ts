import * as supertest from 'supertest';
import app from '../../src';

const request = supertest(app);
jest.mock('bcrypt',()=>({
  compareSync: jest.fn().mockResolvedValueOnce(false)
    .mockResolvedValueOnce(true)
  })
)
jest.mock('jsonwebtoken',()=>({
    sign : jest.fn().mockResolvedValueOnce('1231231ads')
    })
)
jest.mock('../../src/models/User', () => ({
      Users: class {
         static findOne = jest.fn().mockResolvedValueOnce(null).
         mockResolvedValueOnce({
          id: 1,
          username: 'duc789',
          password: '12345678',
          phone: '093094192',
          email: 'abc12@gmail.com',
          updated_at: "2020-02-25T13:00:59.256Z",
          created_at: "2020-02-25T13:00:59.256Z"
         }).mockResolvedValueOnce({
          id: 1,
          token: '1231231ads',
          user_id: 1,
          expried_at: '2020-02-25T13:00:59.256Z',
          updated_at: "2020-02-25T13:00:59.256Z",
          created_at: "2020-02-25T13:00:59.256Z"
         });
         static comparePassword = jest.fn().mockRejectedValueOnce({ status:400}).mockResolvedValueOnce(true);
        constructor() {
        } 
      }
  })
);
jest.mock('../../src/models/',()=>({
  default:{
    Sessions:class{
      public save = jest.fn().mockResolvedValueOnce({
        id: 1,
        token: '1231231ads',
        user_id: 1,
        expried_at: '2020-02-25T13:00:59.256Z',
        updated_at: "2020-02-25T13:00:59.256Z",
        created_at: "2020-02-25T13:00:59.256Z"
      });
      static findOne = jest.fn().mockResolvedValueOnce({
        id: 1,
        token: '1231231ads',
        user_id: 1,
        expried_at: '2020-02-25T13:00:59.256Z',
        updated_at: "2020-02-25T13:00:59.256Z",
        created_at: "2020-02-25T13:00:59.256Z",
        set : jest.fn().mockResolvedValueOnce({
            id: 1,
            token: '1231231ads',
            user_id: 1,
            expried_at: '2020-02-25T13:00:59.256Z',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z",
          }),
        save : jest.fn().mockResolvedValueOnce({
            id: 1,
            token: '1231231ads',
            user_id: 1,
            expried_at: '2020-02-25T13:00:59.256Z',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z",
          })  
      }).mockResolvedValueOnce(null)
        constructor() {
        } 
    }
  }
}))
afterAll(() => {
    jest.resetAllMocks();
  });

  describe('POST LOGIN /auth/login',()=>{
    it('POST LOGIN - login user validate username',async ()=>{
        const body ={
            username :"",
            password:"12345678"
        }
        const result = await request.post('/api/auth/login').send(body);
        expect(result.status).toEqual(400);
        if (result.error) {
         expect(result.error.text).toMatchSnapshot();
        }
    })
    it('POST LOGIN - Login with username not found ',async ()=>{
      const body ={
        username :"ducphan",
        password :"duchihihi"
      }
  
      const result = await request.post('/api/auth/login').send(body);
      expect(result.status).toEqual(404);
    })
    it('POST LOGIN - login with password invalid',async ()=>{
      const body ={
        username :"ducphan",
        password :"duchihihi"
      }
      
      const result = await request.post('/api/auth/login').send(body);
      expect(result.status).toEqual(400);
    })
    it("POST LOGIN - login is success",async ()=>{
      const body ={
        username: 'duc789',
        password: '12345678'
      }
      
      const result = await request.post('/api/auth/login').send(body);
      expect(result.status).toEqual(200);
      expect(result.body.token).toEqual('1231231ads');
      expect(result.body.user.id).toEqual(1);
    })
  })
  describe('PUT LOGOUT -  auth/logout ',()=>{
    it('PUT LOGOUT - logout is success ',async ()=>{
        const result = await request.put('/api/auth/logout/1');

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
            id: 1,
            token: '1231231ads',
            user_id: 1,
            expried_at: '2020-02-25T13:00:59.256Z',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z",
        })
    })
    it('PUT LOGOUT - logout failed', async ()=>{
        const result = await request.put('/api/auth/logout/2');

        expect(result.status).toEqual(400);
    })
  })