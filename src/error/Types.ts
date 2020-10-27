export const AppError = {
  database: 'DATABASE',
  validation: 'VALIDATION',
  elasticsearch: 'ELASTICSEARCH',
};
export type AppError = typeof AppError[keyof typeof AppError];
