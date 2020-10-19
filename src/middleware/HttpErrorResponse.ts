import { NextFunction, Request, Response } from 'express';
import * as IO from 'fp-ts/lib/IO';

export const httpErrorResponse = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): IO.IO<Response> =>
  IO.of(
    response.status(400).send({
      message: error.message,
      status: 400,
    }),
  );
