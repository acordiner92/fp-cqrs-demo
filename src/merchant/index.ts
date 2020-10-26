import { IDatabase } from 'pg-promise';
import { Merchant } from './Merchant';
import { GenerateId, GenerateDate } from '../IoUtils';

export type Dependencies = {
  readonly database: IDatabase<Merchant>;
  readonly generateId: GenerateId;
  readonly generateDate: GenerateDate;
};
