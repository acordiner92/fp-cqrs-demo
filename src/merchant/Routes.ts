import { Router } from 'express';
import { get } from './MerchantController';
export const routes = Router().get('/', get);
