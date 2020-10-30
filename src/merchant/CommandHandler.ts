import { pipe } from 'fp-ts/lib/pipeable';
import { create, Merchant } from './Merchant';
import { create as createToDb } from './MerchantWriteRepository';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as R from 'fp-ts/lib/Reader';
import { CreateMerchantCommandDependencies } from '.';
import { CreateMerchantCommand } from './Commands';
import * as IO from 'fp-ts/lib/IO';
import * as TE from 'fp-ts/lib/TaskEither';

const emitCreatedEvent = (merchant: Merchant) => (
  deps: CreateMerchantCommandDependencies,
): IO.IO<Merchant> =>
  pipe(
    deps.merchantEventEmitter.merchantCreated(merchant),
    IO.map(() => merchant),
  );
export const createMerchant = (
  createMerchantCommand: CreateMerchantCommand,
): RTE.ReaderTaskEither<CreateMerchantCommandDependencies, Error, Merchant> =>
  pipe(
    createMerchantCommand,
    create,
    R.map(RTE.rightIO),
    RTE.rightReader,
    RTE.flatten,
    RTE.chain(createToDb),
    RTE.chain(x => R.asks(y => TE.fromIO(emitCreatedEvent(x)(y)))),
  );
