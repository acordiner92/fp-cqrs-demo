import { EventEmitter } from 'events';
import * as IO from 'fp-ts/lib/IO';
import * as T from 'fp-ts/lib/Task';
import { Merchant } from './Merchant';

const MerchantEvent = {
  created: 'CREATED',
};
type MerchantEvent = typeof MerchantEvent[keyof typeof MerchantEvent];

export type MerchantEventEmitter = {
  readonly merchantCreated: (merchant: Merchant) => IO.IO<void>;
  readonly onMerchantCreated: (func: OnMerchantCreated) => IO.IO<void>;
};

type OnMerchantCreated = (merchant: Merchant) => Promise<void>;
export const merchantEventEmitter = (): MerchantEventEmitter => {
  const eventEmitter = new EventEmitter();

  const merchantCreated = (merchant: Merchant): IO.IO<void> =>
    IO.of(eventEmitter.emit(MerchantEvent.created, merchant));

  const onMerchantCreated = (func: OnMerchantCreated): IO.IO<void> =>
    IO.of(eventEmitter.on(MerchantEvent.created, func));

  return {
    merchantCreated,
    onMerchantCreated,
  };
};
