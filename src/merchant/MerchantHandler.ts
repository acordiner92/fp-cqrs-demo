import { pipe } from 'fp-ts/lib/pipeable';
import { create, Merchant, ProposedMerchant } from './Merchant';

export const createMerchant = (proposedMerchant: ProposedMerchant): Merchant =>
  pipe(proposedMerchant, create);
