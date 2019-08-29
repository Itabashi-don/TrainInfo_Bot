const scrapeClient = require("cheerio-httpcli");

require("./../lib/Typedef");
const OperationHelper = require("./../lib/OperationHelper");
const { returnData } = require("./../lib/EndPoint");



/**
 * 発表中の鉄道運行情報の一覧を返す
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const operations = await OperationHelper.getOperations();
	return returnData(res, null, operations);
};