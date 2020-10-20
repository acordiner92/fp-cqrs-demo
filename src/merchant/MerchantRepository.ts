import { Merchant } from './Merchant';
import * as TE from 'fp-ts/lib/TaskEither';
import DatabaseError from '../error/DatabaseError';
import { pipe } from 'fp-ts/lib/pipeable';
import { getClient, getConnection } from '../PostgresConnection';
import { config } from '../config/Development';

export const create = (merchant: Merchant): TE.TaskEither<Error, Merchant> =>
  TE.tryCatch(
    () =>
      pipe(getClient<Merchant>(getConnection(), config.postgres), db =>
        db.one(
          `
    INSERT INTO merchant
    (id, status, currency, website_url, country, discount_percentage, is_deleted, created_at, updated_at)
    VALUES ($(id), $(status), $(currency), $(websiteUrl), 
        $(country), $(discountPercentage), $(isDeleted), $(createdAt), $(updatedAt))
    RETURNING id, status, currency, website_url, country, discount_percentage, is_deleted, created_at, updated_at
    `,
          merchant,
        ),
      ),
    error => new DatabaseError(`${error}`),
  );
