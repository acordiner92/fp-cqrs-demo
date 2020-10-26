import { Router } from 'express';
import { create } from './MerchantController';
import { requestBodyValidation } from '../middleware/RequestBodyValidation';
import { Merchant, ProposedMerchant } from './Merchant';
import { getClient, getConnection } from '../PostgresConnection';

const database = getClient<Merchant>(getConnection(), {
  user: 'postgres',
  host: 'localhost',
  database: 'merchant',
  password: 'postgres',
  port: 5432,
});

const dependencies = {
  database,
};

export const routes = Router().post(
  '/',
  requestBodyValidation(ProposedMerchant),
  (request, response, next) => create(request, response, next)(dependencies)(),
);
