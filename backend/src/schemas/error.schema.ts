/**
 * ErrorSchema
 *
 * @typedef {object} ErrorSchema
 * @property {string} field - Field
 * @property {string|null} value - Value
 * @property {number|null} replyCode - ReplyCode
 * @property {string|null} replyMessage - ReplyMessage
 */
export type ErrorSchema = {
  field: string;
  value?: string;
  replyCode?: number;
  replyMessage?: string;
}
