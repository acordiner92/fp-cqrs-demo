import { Merchant } from './Merchant';
import * as TE from 'fp-ts/lib/TaskEither';
import DatabaseError from '../error/DatabaseError';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import { Dependencies } from '.';

export const create = (
  merchant: Merchant,
): RTE.ReaderTaskEither<Dependencies, Error, Merchant> => deps =>
  TE.tryCatch(
    () =>
      deps.database.one(
        `
    INSERT INTO merchant
    (id, status, currency, website_url, country, discount_percentage, is_deleted, created_at, updated_at)
    VALUES ($(id), $(status), $(currency), $(websiteUrl), 
        $(country), $(discountPercentage), $(isDeleted), $(createdAt), $(updatedAt))
    RETURNING id, status, currency, website_url, country, discount_percentage, is_deleted, created_at, updated_at
    `,
        merchant,
      ),
    error => new DatabaseError(`${error}`),
  );
