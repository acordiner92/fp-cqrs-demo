import { Router } from 'express';
import { get } from './MerchantController';
import { requestBodyValidation } from '../middleware/RequestBodyValidation';
import * as t from 'io-ts';

const User = t.type({
  id: t.number,
  name: t.string,
  username: t.string,
  email: t.string,
});

export const routes = Router().get('/', requestBodyValidation(User), get);
