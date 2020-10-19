import { AppError } from './Types';

/* eslint-disable functional/no-this-expression, functional/no-class, functional/no-expression-statement */
export default class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = AppError.validation;
  }
}
