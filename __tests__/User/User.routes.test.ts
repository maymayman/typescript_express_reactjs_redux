// import * as httpMocks from 'node-mocks-http';
import * as supertest from 'supertest';
import app from '../../src';

const successUserData = {
  id: 1,
  username: 'duc789',
  password: '12345678',
  phone: '093094192',
  email: 'abc12@gmail.com',
  updated_at: "2020-02-25T13:00:59.256Z",
  created_at: "2020-02-25T13:00:59.256Z"
};

const request = supertest(app);
jest.mock('../../src/models/', () => ({
  default: {
    Users: class {
      //public save;
      public save = jest.fn().mockResolvedValueOnce({ ...successUserData });
      static findByPk = jest.fn().mockResolvedValueOnce({
          id: 1,
          username: 'duc789',
          password: '12345678',
          phone: '093094192',
          email: 'abc12@gmail.com',
          updated_at: "2020-02-25T13:00:59.256Z",
          created_at: "2020-02-25T13:00:59.256Z",
          destroy: jest.fn().mockResolvedValue({
            id: 1,
            username: 'duc789',
            password: '12345678',
            phone: '093094192',
            email: 'abc12@gmail.com',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z"
           }),
          set: jest.fn().mockResolvedValue({
            id: 1,
            username: 'duc789',
            password: '12345678',
            phone: '093094192',
            email: 'abc12@gmail.com',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z",
          }),
          save:jest.fn().mockResolvedValue({
            id: 1,
            username: 'duc789',
            password: '12345678',
            phone: '093094192',
            email: 'abc12@gmail.com',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z",
          }
      )}).mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
          id: 1,
          username: 'duc789',
          password: '12345678',
          phone: '093094192',
          email: 'abc12@gmail.com',
          updated_at: "2020-02-25T13:00:59.256Z",
          created_at: "2020-02-25T13:00:59.256Z",
          destroy: jest.fn().mockResolvedValue({
            id: 1,
            username: 'duc789',
            password: '12345678',
            phone: '093094192',
            email: 'abc12@gmail.com',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z"
           })
      }).mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
          id: 1,
          username: 'duc789',
          password: '12345678',
          phone: '093094192',
          email: 'abc12@gmail.com',
          updated_at: "2020-02-25T13:00:59.256Z",
          created_at: "2020-02-25T13:00:59.256Z",
          set: jest.fn().mockResolvedValue({
            id: 1,
            username: 'duc789',
            password: '12345678',
            phone: '093094192',
            email: 'abc12@gmail.com',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z",
          }),
          save:jest.fn().mockResolvedValue({
            id: 1,
            username: 'duc789',
            password: '12345678',
            phone: '093094192',
            email: 'abc12@gmail.com',
            updated_at: "2020-02-25T13:00:59.256Z",
            created_at: "2020-02-25T13:00:59.256Z",
          })
      }).mockResolvedValueOnce(null)
      constructor() {
        // this.save = jest.fn();
        // (this.save as jest.Mock).mockResolvedValueOnce({
        //   id: 1,
        //   username: 'duc789',
        //   password: '12345678',
        //   phone: '093094192',
        //   email: 'abc12@gmail.com',
        //   updated_at: "2020-02-25T13:00:59.256Z",
        //   created_at: "2020-02-25T13:00:59.256Z"
        // })
      } 
    }
  }
}));


afterAll( () =>{
  jest.resetAllMocks();
});
describe('Test the root path', () => {
  it('It should response the GET method', async () => {
    const result = await request.get('/');
    
    expect(result.status).toEqual(200);
  });
});

describe('POST /users', () => {
  it('POST /users - create user validate username', async () => {
    const userInfo = {
      password: '12345678',
      phone: '093094192',
      email: 'abc12@gmail.com'
    };

    const result = await request.post('/api/users').send(userInfo);
    
    expect(result.status).toEqual(400);
    if (result.error) {
      expect(result.error.text).toMatchSnapshot();
    }
  });
  it('POST /users - create user validate success', async () => {
    const userInfo = {
      username: 'duc789',
      password: '12345678',
      phone: '093094192',
      email: 'abc12@gmail.com'
    };

    const result = await request.post('/api/users').send(userInfo);
    
    expect(result.status).toEqual(200);
    expect(result.body.username).toEqual(userInfo.username);
    expect(result.body.phone).toEqual(userInfo.phone);
    expect(result.body.email).toEqual(userInfo.email);
  });
});

describe('GET /users',()=>{
  it('GET /users/:id - get user by id is success',async () =>{
    const result = await request.get('/api/users/1');
    
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ ...successUserData })
  });
  it('GET /users/:id - get user by id returns null',async ()=>{
    const result = await request.get('/api/users/2');
   
    expect(result.status).toEqual(404);
  })
});
describe('DELETE /user', ()=>{
   it('DELETE /user/:id - delete user by id is success',async ()=>{
    const result = await request.delete('/api/users/1');

    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ ...successUserData })
  });
   it('Delete /users/:id - delete user by id return null',async ()=>{
    const result = await request.delete('/api/users/3');
    
    expect(result.body).toEqual({ message: 'User Not Found.' })
    expect(result.status).toEqual(404);
  });
});
describe('PUT /user/:id', ()=>{  
   it('PUT /user/:id - update user by id is success',async ()=>{
    const userInfo = {
      username: 'duc789',
      password: '12345678',
      phone: '093094192',
      email: 'abc12@gmail.com'
    };
    const result = await request.put('/api/users/1').send(userInfo);
   
    expect(result.body.username).toEqual(userInfo.username);
    expect(result.body.password).toEqual(userInfo.password);
  })
   it('PUT /user/:id - update user by id but return null', async ()=>{
    const userInfo = {
      username: 'duc789',
      password: '12345678',
      phone: '093094192',
      email: 'abc12@gmail.com'
    };
    const result = await request.put('/api/users/2').send(userInfo);
    expect(result.body).toEqual({ message: 'User Not Found.' });
    expect(result.status).toEqual(404);
  })
  it('PUT /users/:id - body not allow validation',async ()=>{
    const userInfo = {
      username :""
    }
    const result = await request.put('/api/users/1').send(userInfo);
    expect(result.status).toEqual(400);
    if (result.error) {
      expect(result.error.text).toMatchSnapshot();
    }
  })
  it('PUT /users/:id - send data with null available', async()=>{
    const userInfo = {
      username :null
    }
    const result = await request.put('/api/users/1').send(userInfo);
    expect(result.status).toEqual(400);
  })
})
