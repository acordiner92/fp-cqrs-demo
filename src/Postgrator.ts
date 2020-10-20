import Postgrator from 'postgrator';
import { config } from './config/Development';
import Logger from './Logger';
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import DatabaseError from './error/DatabaseError';
import * as IO from 'fp-ts/lib/IO';

const {
  postgres: { user, host, database, password, port },
} = config;

const postgrator = new Postgrator({
  migrationDirectory: `${__dirname}/../script/migration`,
  driver: 'pg',
  host,
  port,
  database,
  username: user,
  password,
  schemaTable: 'schemaversion',
});

const executeMigration = (): IO.IO<void> =>
  pipe(
    TE.tryCatch(
      () => postgrator.migrate(),
      error => new DatabaseError(`Migration failed ${error}`),
    ),
    TE.fold(
      error => T.of(Logger.error(error)),
      migrations => T.of(Logger.info(migrations)),
    ),
  );

// eslint-disable-next-line functional/no-expression-statement
executeMigration()();
