import * as t from 'io-ts';

const CreateMerchantCommand = t.type({
  status: t.string,
  currency: t.string,
  websiteUrl: t.string,
  country: t.string,
  discountPercentage: t.number,
});
export type CreateMerchantCommand = t.TypeOf<typeof CreateMerchantCommand>;

const UpdateMerchantCommand = t.type({
  id: t.string,
  status: t.string,
  currency: t.string,
  websiteUrl: t.string,
  country: t.string,
  discountPercentage: t.number,
});
export type UpdateMerchantCommand = t.TypeOf<typeof UpdateMerchantCommand>;

const RemoveMerchantCommand = t.type({
  id: t.string,
});
export type RemoveMerchantCommand = t.TypeOf<typeof RemoveMerchantCommand>;
