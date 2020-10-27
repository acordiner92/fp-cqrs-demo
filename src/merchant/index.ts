import { IDatabase } from 'pg-promise';
import { Merchant } from './Merchant';
import { GenerateId, GenerateDate } from '../IoUtils';
import { Client } from '@elastic/elasticsearch';

export type CreateMerchantCommandDependencies = {
  readonly database: IDatabase<Merchant>;
  readonly generateId: GenerateId;
  readonly generateDate: GenerateDate;
};

export type GetByIdQueryDependencies = {
  readonly client: Client;
};
