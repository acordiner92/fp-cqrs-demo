import { IDatabase } from 'pg-promise';
import { Merchant } from './Merchant';

export type Dependencies = {
  readonly database: IDatabase<Merchant>;
};
