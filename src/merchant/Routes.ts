import { Router } from 'express';
import { create } from './MerchantController';
import { requestBodyValidation } from '../middleware/RequestBodyValidation';
import { ProposedMerchant } from './Merchant';

export const routes = Router().post(
  '/',
  requestBodyValidation(ProposedMerchant),
  create,
);
