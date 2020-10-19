import { NextFunction, Request, Response } from 'express';
import * as IO from 'fp-ts/lib/IO';
import { match } from 'ts-pattern';
import { AppError } from '../error/Types';

const sendResponse = (response: Response) => (
  statusCode: number,
  message: string,
): IO.IO<Response> =>
  IO.of(
    response.status(statusCode).send({
      message,
      status: statusCode,
    }),
  );
export const httpErrorResponse = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): IO.IO<Response> =>
  match(error.name)
    .with(AppError.validation, () => sendResponse(response)(400, error.message))
    .otherwise(() => sendResponse(response)(500, error.message));
