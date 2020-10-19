import { pipe } from 'fp-ts/lib/pipeable';
import { create, Merchant, ProposedMerchant } from './Merchant';
import { create as createToDb } from './MerchantRepository';
import * as TE from 'fp-ts/lib/TaskEither';

export const createMerchant = (
  proposedMerchant: ProposedMerchant,
): TE.TaskEither<Error, Merchant> =>
  pipe(proposedMerchant, create, TE.fromIO, TE.chain(createToDb));
