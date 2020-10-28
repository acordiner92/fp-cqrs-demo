import { Router } from 'express';
import { create, getById } from './MerchantController';
import { requestBodyValidation } from '../middleware/RequestBodyValidation';
import { Merchant } from './Merchant';
import { CreateMerchantCommand } from './Commands';
import { getClient, getConnection } from '../PostgresConnection';
import { generateDate, generateId } from '../IoUtils';
import { Client } from '@elastic/elasticsearch';

const database = getClient<Merchant>(getConnection(), {
  user: 'postgres',
  host: 'localhost',
  database: 'merchant',
  password: 'postgres',
  port: 5432,
});

const createCommandDependencies = {
  database,
  generateId,
  generateDate,
};

const getByIdQueryDependencies = {
  client: new Client({ node: 'http://localhost:9200' }),
};

export const routes = Router()
  .post(
    '/',
    requestBodyValidation(CreateMerchantCommand),
    (request, response, next) =>
      create(request, response, next)(createCommandDependencies)(),
  )
  .get('/:id', (request, response, next) =>
    getById(request, response, next)(getByIdQueryDependencies)(),
  );
