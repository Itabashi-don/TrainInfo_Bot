/**
 * A Request extended by ZEIT Now
 * @see https://zeit.co/docs/v2/serverless-functions/supported-languages/#node.js-helpers
 * 
 * @typedef {Request} NowRequest
 * @prop {string | {}} query
 * @prop {string | {}} cookies
 * @prop {string | null} body
 */

 /**
 * A Response extended by ZEIT Now
 * @see https://zeit.co/docs/v2/serverless-functions/supported-languages/#node.js-helpers
 * 
 * @typedef {Response} NowResponse
 * @prop { (code: number) => NowResponse } status
 * @prop { (body: string | object | Buffer) => void } send
 * @prop { (obj: object) => void } json
 */

/**
 * @typedef {object} Operation
 * @prop {string} name 鉄道名
 * @prop {"平常運転" | "運転見合わせ" | "遅延" | "お知らせ"} status 運行状況
 * @prop {string | null} detail 運行情報の詳細
 * @prop {string | null} createdAt 発表日時 (YYYY/MM/DD hh:mm)
 */