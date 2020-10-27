import { AppError } from './Types';

/* eslint-disable functional/no-this-expression, functional/no-class, functional/no-expression-statement */
export default class ElasticsearchError extends Error {
  readonly statusCode: number;

  readonly body: Record<string, unknown>;
  constructor(
    message: string,
    statusCode: number,
    body: Record<string, unknown>,
  ) {
    super(message);
    this.name = AppError.elasticsearch;
    this.statusCode = statusCode;
    this.body = body;
  }
}
