import * as cors from "cors";
import * as express from 'express';
import * as createError from 'http-errors';
import * as morgan from 'morgan'

import logger from './plugins/logger'
import UserRouter from './routes/User';

import importsql from './migration/migration';

importsql;


// import sequelize from './database/connection';

// const database = async() =>{
//   await sequelize.sync({force:false});
//   sequelize.authenticate().then(()=>{
//     console.log("database Connectioned!!!");
//   }).catch(err=>{
//     logger.error(err);
//   })
// }
// database();


logger.info('App is Running');
import { LOG_FORMAT } from './constants'

const app = express();

app.use(morgan(LOG_FORMAT));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
  credentials: true,
  methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: '*',
  preflightContinue: false
};

// use cors middleware
app.use(cors(options));

// add your routes

// enable pre-flight
app.options("*", cors(options));

app.get('/', (req: express.Request, res: express.Response) => res.json({ heathCheck: true }))
app.use('/user',UserRouter);
// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => next(createError(404)));

// error handler
app.use((err, req: express.Request, res: express.Response, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

export default app