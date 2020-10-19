export const AppError = {
  database: 'DATABASE',
  validation: 'VALIDATION',
};
export type AppError = typeof AppError[keyof typeof AppError];
