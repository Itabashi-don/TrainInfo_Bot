const scrapeClient = require("cheerio-httpcli");

const { returnData } = require("./../lib/EndPoint");



/**
 * 発表中の鉄道運行情報の一覧を返す
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const $doc = (await scrapeClient.fetch("http://www.jikokuhyo.co.jp/news/list")).$;

	const table = $doc(".corner_block.top_pad");
	const date = table.children(".corner_block_header3").text().trim();

	const operations = table.find(".corner_block_content > ul > li a").map(async (i, elem) => {
		const info = $doc(elem).contents();

		const time = info.first().text().trim();
		const name = $doc(elem).children(".accent_color").text();
		const status = info.last().text().trim();

		const operation = { name, status, createdAt: `${date} ${time}` };

		if (req.query.simple != null && req.query.simple.toLowerCase() !== "false") {
			return operation;
		} else {
			const detail = (await $doc(elem).click()).$(".corner_block_content > ul > li .corner_block_row_detail_d").text().trim();
			operation.detail = detail;

			return operation;
		}
	}).toArray();

	return returnData(res, null, await Promise.all(operations));
};