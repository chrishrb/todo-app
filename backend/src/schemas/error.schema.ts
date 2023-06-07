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
  error?: string;
}
