import { pipe } from 'fp-ts/lib/pipeable';
import { create, Merchant, ProposedMerchant } from './Merchant';
import { create as createToDb } from './MerchantRepository';
import * as RTE from 'fp-ts/lib/ReaderTaskEither';
import * as R from 'fp-ts/lib/Reader';
import { Dependencies } from '.';

export const createMerchant = (
  proposedMerchant: ProposedMerchant,
): RTE.ReaderTaskEither<Dependencies, Error, Merchant> =>
  pipe(
    proposedMerchant,
    create,
    R.map(RTE.rightIO),
    RTE.rightReader,
    RTE.flatten,
    RTE.chain(createToDb),
  );
