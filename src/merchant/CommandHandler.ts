import { pipe } from 'fp-ts/lib/pipeable';
import { create, Merchant } from './Merchant';
import { create as createToDb } from './MerchantWriteRepository';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as R from 'fp-ts/lib/Reader';
import { CreateMerchantCommandDependencies } from '.';
import { CreateMerchantCommand } from './Commands';

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
  );
