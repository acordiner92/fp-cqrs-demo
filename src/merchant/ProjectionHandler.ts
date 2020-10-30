import { pipe } from 'fp-ts/lib/pipeable';
import * as R from 'fp-ts/lib/Reader';
import * as TE from 'fp-ts/lib/TaskEither';
import { ProjectionDependencies } from '.';
import Logger from '../Logger';
import * as T from 'fp-ts/lib/Task';

export const onMerchantCreatedProjection = (): R.Reader<
  ProjectionDependencies,
  void
> =>
  pipe(
    R.ask<ProjectionDependencies>(),
    R.chain(deps =>
      deps.merchantEventEmitter.onMerchantCreated(m =>
        pipe(
          TE.tryCatch(
            () =>
              deps.client.index({
                index: 'merchant',
                id: m.id,
                body: m,
              }),
            error => new Error(`${error}`),
          ),
          TE.fold(
            error => T.of(Logger.error(error)),
            m => T.of(Logger.info(m)),
          ),
        )(),
      ),
    ),
  );
