/**
 * A Request extended by ZEIT Now
 * @see https://zeit.co/docs/v2/serverless-functions/supported-languages/#node.js-helpers
 * 
 * @typedef {Request} NowRequest
 * @prop {string | {}} query
 * @prop {string | {}} cookies
 * @prop {string | null} body
 */
void(0);

 /**
 * A Response extended by ZEIT Now
 * @see https://zeit.co/docs/v2/serverless-functions/supported-languages/#node.js-helpers
 * 
 * @typedef {Response} NowResponse
 * @prop { (code: number) => NowResponse } status
 * @prop { (body: string | object | Buffer) => void } send
 * @prop { (obj: object) => void } json
 */
void(0);



/** @typedef {"平常運転" | "運転見合わせ" | "運転再開見込" | "運転再開" | "遅延" | "一部運休" | "直通運転中止" | "折返し運転" | "お知らせ"} OperationStatus */
void(0);

/**
 * @typedef {object} Operation
 * @prop {string} name 鉄道名
 * @prop {OperationStatus} status 運行状況
 * @prop {string | null} detail 詳細情報
 * @prop {string | null} createdAt 発表日時 (YYYY/MM/DD hh:mm)
 */
void(0);

/**
 * @typedef {object} SimpleOperation
 * @prop {string} name 鉄道名
 * @prop {OperationStatus} status 運行状況
 * @prop {string | null} createdAt 発表日時 (YYYY/MM/DD hh:mm)
 */
void(0);

/**
 * @typedef {object} OperationSource
 * @prop {string} name 鉄道名
 * @prop {OperationStatus} status 運行状況
 * @prop {string | null} url 詳細情報が掲載されているURL
 * @prop {string | null} createdAt 発表日時 (YYYY/MM/DD hh:mm)
 */
void(0);