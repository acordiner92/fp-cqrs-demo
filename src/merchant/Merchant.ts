import * as t from 'io-ts';
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

const create = (proposedMerchant: ProposedMerchant): Merchant => ({
  id: 'xxx',
  ...proposedMerchant,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
});

export { create, ProposedMerchant };
