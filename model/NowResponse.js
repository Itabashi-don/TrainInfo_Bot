/**
 * @typedef {Response} NowResponse
 * @prop { (code: number) => NowResponse } status
 * @prop { (body: string | object | Buffer) => void } send
 * @prop { (obj: object) => void } json
 */