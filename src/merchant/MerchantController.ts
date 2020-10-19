import { Request, Response } from 'express';
import * as IO from 'fp-ts/lib/IO';
import { createMerchant } from './MerchantHandler';

export const create = (request: Request, response: Response): IO.IO<Response> =>
  IO.of(response.status(200).json(createMerchant(request.body)));
