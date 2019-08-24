const scrapeClient = require("cheerio-httpcli");

const { returnData } = require("./../lib/EndPoint");



/**
 * 発表中の鉄道運行情報の一覧を取得します
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const $doc = (await scrapeClient.fetch("http://www.jikokuhyo.co.jp/news/list")).$;

	const table = $doc(".corner_block.top_pad");

	const date = table.children(".corner_block_header3").text().trim();
	const operations = table.find(".corner_block_content > ul > li a").map(async (i, elem) => {
		const operation = $doc(elem).contents();

		const time = operation.first().text().trim();
		const name = $doc(elem).children(".accent_color").text();
		const status = operation.last().text().trim();
		const detail = (await $doc(elem).click()).$(".corner_block_content > ul > li .corner_block_row_detail_d").text();

		return { name, status, date: `${date} ${time}`, detail };
	}).toArray();

	return returnData(res, null, await Promise.all(operations));
};