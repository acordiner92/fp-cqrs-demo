import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';
import { generateDate, generateId } from '../IoUtils';
import * as IO from 'fp-ts/lib/IO';
import { sequenceT } from 'fp-ts/lib/Apply';

export const ActivityStatus = {
  active: 'ACTIVE',
  inactive: 'INACTIVE',
};
export type ActivityStatus = typeof ActivityStatus[keyof typeof ActivityStatus];

const ProposedMerchant = t.type({
  status: t.string,
  currency: t.string,
  websiteUrl: t.string,
  country: t.string,
  discountPercentage: t.number,
});

export type Merchant = {
  readonly id: string;
  readonly status: ActivityStatus;
  readonly currency: string;
  readonly websiteUrl: string;
  readonly country: string;
  readonly discountPercentage: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly isDeleted: boolean;
};

type ProposedMerchant = t.TypeOf<typeof ProposedMerchant>;

const create = (proposedMerchant: ProposedMerchant): IO.IO<Merchant> =>
  pipe(
    sequenceT(IO.io)(generateId(), generateDate(), generateDate()),
    IO.map(([id, createdAt, updatedAt]) => ({
      id,
      ...proposedMerchant,
      createdAt,
      updatedAt,
      isDeleted: false,
    })),
  );

export { create, ProposedMerchant };
