const scrapeClient = require("cheerio-httpcli");

const { returnData } = require("./../lib/EndPoint");



/**
 * 発表中の鉄道運行情報の一覧を取得します
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const result = (await scrapeClient.fetch("http://www.jikokuhyo.co.jp/news/list")).body;

	return returnData(res, null, result);
};