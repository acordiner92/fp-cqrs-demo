import { getById, getByCountry } from './MerchantReadRepository';
import { GetByCountry, GetById } from './Queries';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as O from 'fp-ts/lib/Option';
import { GetByIdQueryDependencies } from '.';
import { MerchantDto } from './MerchantDto';
import { pipe } from 'fp-ts/lib/function';
import * as Array from 'fp-ts/lib/ReadonlyArray';
import { mapMerchantToDto } from './DtoMapper';

export const getMerchantById = (
  getByIdQuery: GetById,
): RTE.ReaderTaskEither<
  GetByIdQueryDependencies,
  Error,
  O.Option<MerchantDto>
> => pipe(getByIdQuery.id, getById, RTE.map(O.map(mapMerchantToDto)));

export const getMerchantByCountry = (
  getByCountryQuery: GetByCountry,
): RTE.ReaderTaskEither<
  GetByIdQueryDependencies,
  Error,
  ReadonlyArray<MerchantDto>
> =>
  pipe(
    getByCountryQuery.country,
    getByCountry,
    RTE.map(Array.map(mapMerchantToDto)),
  );
