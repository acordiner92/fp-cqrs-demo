import { Merchant } from './Merchant';
import * as TE from 'fp-ts/lib/TaskEither';
import DatabaseError from '../error/DatabaseError';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import { CreateMerchantCommandDependencies } from '.';

export const create = (
  merchant: Merchant,
): RTE.ReaderTaskEither<
  CreateMerchantCommandDependencies,
  Error,
  Merchant
> => deps =>
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

export const update = (
  merchant: Merchant,
): RTE.ReaderTaskEither<
  CreateMerchantCommandDependencies,
  Error,
  null
> => deps =>
  TE.tryCatch(
    () =>
      deps.database.none(
        `
  UPDATE merchant
  SET status=$(status), currency=$(currency), website_url=$(websiteUrl), country=$(country), 
  discount_percentage=$(discountPercentage), updated_at=$(updatedAt), is_deleted=$(isDeleted)
  WHERE id=$(id)
  `,
        merchant,
      ),
    error => new DatabaseError(`${error}`),
  );
