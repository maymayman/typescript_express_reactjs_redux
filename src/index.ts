import * as express from 'express';
import * as cors from "cors";
import * as createError from 'http-errors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
  credentials: true,
  methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: '*',
  preflightContinue: false
};

//use cors middleware
app.use(cors(options));

//add your routes

//enable pre-flight
app.options("*", cors(options));

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