import { v4 as uuid } from 'uuid';
import * as IO from 'fp-ts/lib/IO';

export const generateId = (): IO.IO<string> => IO.of(uuid());

export const generateDate = (): IO.IO<Date> => IO.of(new Date());
