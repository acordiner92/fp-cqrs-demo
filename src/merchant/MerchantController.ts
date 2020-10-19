import { Request, Response } from 'express';
import * as IO from 'fp-ts/lib/IO';

export const get = (_request: Request, response: Response): IO.IO<Response> =>
  IO.of(response.status(200).json({ message: 'hello world!' }));
