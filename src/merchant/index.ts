import { IDatabase } from 'pg-promise';
import { Merchant } from './Merchant';
import { GenerateId, GenerateDate } from '../IoUtils';
import { Client } from '@elastic/elasticsearch';
import { MerchantEventEmitter } from './Events';

export type CreateMerchantCommandDependencies = {
  readonly database: IDatabase<Merchant>;
  readonly merchantEventEmitter: MerchantEventEmitter;
  readonly generateId: GenerateId;
  readonly generateDate: GenerateDate;
};

export type GetByIdQueryDependencies = {
  readonly client: Client;
};

export type GetByCountryQueryDependencies = {
  readonly client: Client;
};

export type ProjectionDependencies = {
  readonly client: Client;
  readonly merchantEventEmitter: MerchantEventEmitter;
};
