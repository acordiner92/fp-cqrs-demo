import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as TE from 'fp-ts/lib/TaskEither';
import * as O from 'fp-ts/lib/Option';
import { GetByIdQueryDependencies } from '.';
import { Merchant } from './Merchant';
import { pipe } from 'fp-ts/lib/pipeable';
import { ElasticsearchClientError } from '@elastic/elasticsearch/lib/errors';

const mapError = (error: unknown): Error =>
  error instanceof ElasticsearchClientError ? error : new Error(`${error}`);

export const getById = (
  id: string,
): RTE.ReaderTaskEither<
  GetByIdQueryDependencies,
  Error,
  O.Option<Merchant>
> => deps =>
  pipe(
    TE.tryCatch(
      () =>
        deps.client.get<Merchant>(
          {
            index: 'merchant',
            id,
          },
          { ignore: [404] },
        ),
      mapError,
    ),
    TE.map(x => (x.statusCode === 404 ? O.none : O.some(x.body))),
  );
