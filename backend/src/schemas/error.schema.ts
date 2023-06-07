/**
 * ErrorSchema
 *
 * @typedef {object} ErrorSchema
 * @property {string} field - Field
 * @property {string|null} value - Value
 * @property {string|null} error - Error
 */
export type ErrorSchema = {
  field: string;
  value?: string;
  errorCode?: number;
  errorMessage?: string;
}
