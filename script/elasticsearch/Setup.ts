import { Client } from '@elastic/elasticsearch';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import Logger from '../../src/Logger';

const client = new Client({ node: 'http://localhost:9200' });

const setupElasticsearch = () =>
  pipe(
    TE.tryCatch(
      () =>
        client.indices.create({
          index: 'merchant',
        }),
      error => new Error(`Failed to setup ES ${error}`),
    ),
    TE.bimap(
      error => Logger.error(error),
      () => Logger.info('Created Merchant Index'),
    ),
  );

setupElasticsearch()();
