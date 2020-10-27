import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as TE from 'fp-ts/lib/TaskEither';
import { GetByIdQueryDependencies } from '.';
import { Merchant } from './Merchant';
import { pipe } from 'fp-ts/lib/pipeable';
import { ElasticsearchClientError } from '@elastic/elasticsearch/lib/errors';

const mapError = (error: unknown): Error =>
  error instanceof ElasticsearchClientError ? error : new Error(`${error}`);

export const getById = (
  id: string,
): RTE.ReaderTaskEither<GetByIdQueryDependencies, Error, Merchant> => deps =>
  pipe(
    TE.tryCatch(
      () =>
        deps.client.get<Merchant>({
          index: 'merchant',
          id,
        }),
      mapError,
    ),
    TE.map(x => x.body),
  );
