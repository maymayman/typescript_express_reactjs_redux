import * as cors from 'cors';
import * as express from 'express';
import * as createError from 'http-errors';
import * as morgan from 'morgan';

import { MORGAN_LOG_FORMAT } from './constants';
import logger from './plugins/logger';
import heathCheckRouter from './routes/heath-check';
import routes from './routes/index';

const app = express();

app.use(morgan(MORGAN_LOG_FORMAT));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization'
  ],
  credentials: true,
  methods: 'GET,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false
};

// use cors middleware
app.use(cors(options));

// add your routes

// enable pre-flight
// heathCheck
app.get('/heath-check', heathCheckRouter);

app.get('/', (_req: express.Request, res: express.Response) =>
  res.send('Permission denied')
);
// path all routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(
  (_req: express.Request, _res: express.Response, next: express.NextFunction) =>
    next(createError(404))
);

// error handler
app.use(
  (
    err,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    logger.error(err.stack);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
  }
);

export default app;
