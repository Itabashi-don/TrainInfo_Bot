/**
 * A Response extended by ZEIT Now
 * @see https://zeit.co/docs/v2/serverless-functions/supported-languages/#node.js-helpers
 * 
 * @typedef {Response} NowResponse
 * @prop { (code: number) => NowResponse } status
 * @prop { (body: string | object | Buffer) => void } send
 * @prop { (obj: object) => void } json
 */