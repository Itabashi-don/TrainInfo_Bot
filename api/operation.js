const scrapeClient = require("cheerio-httpcli");

require("./../lib/Typedef");
const { returnData, returnError } = require("./../lib/EndPoint");



/**
 * 指定された鉄道の運行情報を返す
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	if (!(req && req.query && req.query.name)) return returnError(res, 400, new TypeError("A parameter, 'name' is required."));

	const $doc = (await scrapeClient.fetch("http://www.jikokuhyo.co.jp/news/list")).$;

	const table = $doc(".corner_block.top_pad");
	const date = table.children(".corner_block_header3").text().trim();

	/** @type {Promise<Operation>[]} */
	const operations = table.find(".corner_block_content > ul > li a").map(async (i, elem) => {
		if ($doc(elem).children(".accent_color").text() === req.query.name) {
			const info = $doc(elem).contents();

			const time = info.first().text().trim();
			const name = $doc(elem).children(".accent_color").text();
			const status = info.last().text().trim();
			const detail = (await $doc(elem).click()).$(".corner_block_content > ul > li .corner_block_row_detail_d").text().trim();

			return { name, status, detail, createdAt: `${date} ${time}` };
		}

		return null;
	}).toArray();

	const operation = (await Promise.all(operations)).find(candidate => candidate) || { name: req.query.name, status: "平常運転", detail: null, createdAt: null };
	return returnData(res, null, operation);
};