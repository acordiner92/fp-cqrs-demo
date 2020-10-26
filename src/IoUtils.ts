import { v4 as uuid } from 'uuid';
import * as IO from 'fp-ts/lib/IO';

export const generateId = (): IO.IO<string> => IO.of(uuid());
export type GenerateId = typeof generateId;
export const generateDate = (): IO.IO<Date> => IO.of(new Date());
export type GenerateDate = typeof generateDate;
