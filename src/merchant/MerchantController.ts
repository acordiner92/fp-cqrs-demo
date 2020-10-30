import { NextFunction, Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/pipeable';
import { createMerchant } from './CommandHandler';
import { getMerchantByCountry, getMerchantById } from './QueryHandler';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as O from 'fp-ts/lib/Option';
import {
  CreateMerchantCommandDependencies,
  GetByCountryQueryDependencies,
  GetByIdQueryDependencies,
} from '.';
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
          ? response.status(200).json(O.toNullable(m))
          : next(
              new ResourceNotFoundError(
                `Could not merchant with id ${request.params.id}`,
              ),
            ),
    ),
  );

export const getByCountry = (
  request: Request,
  response: Response,
  next: NextFunction,
): RTE.ReaderTaskEither<
  GetByCountryQueryDependencies,
  void,
  Response<ReadonlyArray<MerchantDto>>
> =>
  pipe(
    getMerchantByCountry({ country: request.query.country as string }),
    RTE.bimap(
      e => next(e),
      x => response.status(200).json(x),
    ),
  );
