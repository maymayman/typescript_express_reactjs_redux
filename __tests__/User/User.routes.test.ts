// import * as httpMocks from 'node-mocks-http';
import * as supertest from 'supertest';
import app from '../../src';

const request = supertest(app);
jest.mock('../../src/models/', () => ({
  default: {
    Users: class {
      public save;
    //   public static findByPk = async (id)=>{
    //     const user = [{
    //         id: 1,
    //         username: 'duc789',
    //         password: '12345678',
    //         phone: '093094192',
    //         email: 'abc12@gmail.com',
    //         updated_at: "2020-02-25T13:00:59.256Z",
    //         created_at: "2020-02-25T13:00:59.256Z"
    //     },{
    //       id: 2,
    //       username: 'thong789',
    //       password: '123456789',
    //       phone: '0930941929',
    //       email: 'abc123@gmail.com',
    //       updated_at: "2020-02-25T13:00:59.256Z",
    //       created_at: "2020-02-25T13:00:59.256Z"
    //   }
    //   ]
    //   console.log(id);
    //   await user.forEach( (item) =>{
    //     console.log(item.id.toString() == id.toString())
    //     if(item.id.toString() == id.toString()){
    //       jest.fn().mockResolvedValueOnce(item);
    //     }else{
    //       console.log(item);
    //     }
        
    //   })
    //   return jest.fn().mockRejectedValueOnce('not Found user')
    // }
      constructor() {
        this.save = jest.fn();
        (this.save as jest.Mock).mockResolvedValueOnce({
          id: 1,
          username: 'duc789',
          password: '12345678',
          phone: '093094192',
          email: 'abc12@gmail.com',
          updated_at: "2020-02-25T13:00:59.256Z",
          created_at: "2020-02-25T13:00:59.256Z"
        })
      } 
    }
  }
}));

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
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

    const result = await request.post('/users').send(userInfo);
    
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

    const result = await request.post('/users').send(userInfo);
    
    expect(result.status).toEqual(200);
    expect(result.body.username).toEqual(userInfo.username);
    expect(result.body.phone).toEqual(userInfo.phone);
    expect(result.body.email).toEqual(userInfo.email);
  });
});

// describe('GET /users',()=>{
//   it('GET /users - get user by id is success',async () =>{
//     const userInfo = {
//         id: 1,
//         username: 'duc789',
//         phone: '093094192',
//         email: 'abc12@gmail.com'
//     }
//     const result = await request.get('/users/1');
//     console.log(result.error);
//     expect(result.body.username).toEqual(userInfo.username);
//     expect(result.body.id).toEqual(userInfo.id);
//   })
//   // it('GET /users - get user by wrong id',async ()=>{

//   // const result = await request.get('/users/2');
    
//   // // expect(result.error.valueOf)
//   // })

// })