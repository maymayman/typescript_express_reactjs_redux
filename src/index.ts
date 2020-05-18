import * as cors from 'cors';
import * as express from 'express';
import * as createError from 'http-errors';
import * as morgan from 'morgan';
import * as path from 'path';

import { createStore } from 'redux';
import reducers from './pages/reducers';

import { MORGAN_LOG_FORMAT } from './constants';
import logger from './plugins/logger';
import AuthRoutes from './routes/auth/Auth';
import heathCheckRouter from './routes/heath-check';
import routes from './routes/index';

import { transactionCrawl } from './jobs';

import { ENABLE_JOB } from '../config';

import { getAppMarkup, getHtml } from './pages/index';

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

// path all routes
app.use('/', routes);
// auth routes
app.use('/auth', AuthRoutes);

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '../../public')));

app.get('*', (req: express.Request, res: express.Response) => {
  const initialState = { initialText: 'rendered on the server' };
  const store = createStore(reducers, initialState);
  const url = req.url;
  const appMarkup = getAppMarkup({ url, store });
  const html = getHtml({ appMarkup, initialState });

  res.send(`<!doctype html>${html}`);
});

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

/***************************************************************************************
 *                   START     RUN       JOBS                                          *
 *                                                                                     *
 ***************************************************************************************/

// start run transactionCrawl
if (ENABLE_JOB) {
  transactionCrawl.start();
}

export default app;
