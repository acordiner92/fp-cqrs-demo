import { NextFunction, Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/pipeable';
import { createMerchant } from './CommandHandler';
import { getMerchantById } from './QueryHandler';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as O from 'fp-ts/lib/Option';
import { CreateMerchantCommandDependencies, GetByIdQueryDependencies } from '.';
import { MerchantDto } from './MerchantDto';
import ResourceNotFoundError from '../error/ResourceNotFoundError';

export const create = (
  request: Request,
  response: Response,
  next: NextFunction,
): RTE.ReaderTaskEither<CreateMerchantCommandDependencies, void, Response> =>
  pipe(
    request.body,
    createMerchant,
    RTE.bimap(
      e => next(e),
      m => response.status(201).json(m),
    ),
  );

export const getById = (
  request: Request,
  response: Response,
  next: NextFunction,
): RTE.ReaderTaskEither<
  GetByIdQueryDependencies,
  void,
  void | Response<MerchantDto>
> =>
  pipe(
    getMerchantById({ id: request.params.id }),
    RTE.bimap(
      e => next(e),
      m =>
        O.isSome(m)
          ? response.status(200).json(m)
          : next(
              new ResourceNotFoundError(
                `Could not merchant with id ${request.params.id}`,
              ),
            ),
    ),
  );
