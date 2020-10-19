import { NextFunction, Request, Response } from 'express';
import * as IO from 'fp-ts/lib/IO';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';
import ValidationError from '../error/ValidationError';

export const requestValidation = <A extends t.Props>(type: t.TypeC<A>) => (
  request: Request,
  _response: Response,
  next: NextFunction,
): IO.IO<void> =>
  pipe(request.body, type.decode, E.isLeft, hasErrors =>
    hasErrors ? IO.of(next(new ValidationError('failed'))) : IO.of(next),
  );
