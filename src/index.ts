import express, { Express } from 'express';
import Logger from './Logger';
import bodyParser from 'body-parser';
import * as IO from 'fp-ts/lib/IO';
import { routes as merchantRoutes } from './merchant/Routes';

const app = express();

const setupExpress = (): IO.IO<Express> =>
  IO.of(app.use(bodyParser.json()).get('api/v1/merchant', merchantRoutes));

// eslint-disable-next-line functional/no-expression-statement
setupExpress();

// eslint-disable-next-line functional/no-expression-statement
app.listen(8080, () => Logger.info('started merchant api....'));
