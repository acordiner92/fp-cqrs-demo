import { pipe } from 'fp-ts/lib/pipeable';
import * as IO from 'fp-ts/lib/IO';
import { sequenceT } from 'fp-ts/lib/Apply';
import * as R from 'fp-ts/lib/Reader';
import { Dependencies } from '.';
import { CreateMerchantCommand, UpdateMerchantCommand } from './Commands';

export const ActivityStatus = {
  active: 'ACTIVE',
  inactive: 'INACTIVE',
};
export type ActivityStatus = typeof ActivityStatus[keyof typeof ActivityStatus];

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

export const create = (
  createMerchantCommand: CreateMerchantCommand,
): R.Reader<Dependencies, IO.IO<Merchant>> => deps =>
  pipe(
    sequenceT(IO.io)(
      deps.generateId(),
      deps.generateDate(),
      deps.generateDate(),
    ),
    IO.map(([id, createdAt, updatedAt]) => ({
      id,
      ...createMerchantCommand,
      createdAt,
      updatedAt,
      isDeleted: false,
    })),
  );

export const update = (
  updateMerchantCommand: UpdateMerchantCommand,
  existingMerchant: Merchant,
): R.Reader<Dependencies, IO.IO<Merchant>> => deps =>
  pipe(
    deps.generateDate(),
    IO.map(updatedAt => ({
      ...existingMerchant,
      ...updateMerchantCommand,
      updatedAt,
    })),
  );

export const remove = (existingMerchant: Merchant): Merchant => ({
  ...existingMerchant,
  isDeleted: true,
});
