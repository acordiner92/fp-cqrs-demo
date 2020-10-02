import express from 'express';
import Logger from './Logger';

const app = express();

// eslint-disable-next-line functional/no-expression-statement
app.listen(8080, () => Logger.info('starting app....'));
