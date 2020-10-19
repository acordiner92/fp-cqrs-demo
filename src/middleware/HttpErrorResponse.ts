import { Request, Response } from 'express';
import * as IO from 'fp-ts/lib/IO';

export const httpErrorResponse = (
  error: Error,
  _request: Request,
  response: Response,
): IO.IO<Response> => IO.of(response.send(200).json({}));
