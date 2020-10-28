export const AppError = {
  database: 'DATABASE',
  validation: 'VALIDATION',
  elasticsearch: 'ELASTICSEARCH',
  resourceNotFound: 'RESOURCE_NOT_FOUND',
};
export type AppError = typeof AppError[keyof typeof AppError];
