import { getById } from './MerchantReadRepository';
import { GetById } from './Queries';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as O from 'fp-ts/lib/Option';
import { GetByIdQueryDependencies } from '.';
import { MerchantDto } from './MerchantDto';
import { pipe } from 'fp-ts/lib/function';
import { mapMerchantToDto } from './DtoMapper';

export const getMerchantById = (
  getByIdQuery: GetById,
): RTE.ReaderTaskEither<
  GetByIdQueryDependencies,
  Error,
  O.Option<MerchantDto>
> => pipe(getByIdQuery.id, getById, RTE.map(O.map(mapMerchantToDto)));
