import { NextFunction, Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/pipeable';
import { createMerchant } from './CommandHandler';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import { Dependencies } from '.';

export const create = (
  request: Request,
  response: Response,
  next: NextFunction,
): RTE.ReaderTaskEither<Dependencies, void, Response> =>
  pipe(
    request.body,
    createMerchant,
    RTE.bimap(
      e => next(e),
      m => response.status(200).json(m),
    ),
  );
