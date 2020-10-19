import { NextFunction, Request, Response } from 'express';
import * as IO from 'fp-ts/lib/IO';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';
import ValidationError from '../error/ValidationError';
import { PathReporter } from 'io-ts/lib/PathReporter';

export const requestBodyValidation = <A extends t.Props>(type: t.TypeC<A>) => (
  request: Request,
  _response: Response,
  next: NextFunction,
): IO.IO<void> =>
  pipe(request.body, type.decode, x =>
    E.isLeft(x)
      ? IO.of(next(new ValidationError(PathReporter.report(x).join('\n'))))
      : IO.of(next()),
  );
