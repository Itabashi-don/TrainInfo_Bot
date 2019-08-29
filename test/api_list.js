const scrapeClient = require("cheerio-httpcli");
require("./../lib/Typedef");



const fetchOperations = async (pageId = 1) => {
	const { $ } = await scrapeClient.fetch(`http://www.jikokuhyo.co.jp/news/list/page/${pageId}`);

	const table = $(".corner_block.top_pad");
	const date = table.children(".corner_block_header3").text().trim();

	/** @type {Object<string, number>} */
	const fetchedCounter = {};

	/** @type {Promise<Operation>[]} */
	const operations = table.find(".corner_block_content > ul > li a").map(async (i, elem) => {
		const detailUrl = $(elem).url();
		const fetchedCount = (typeof fetchedCounter[detailUrl] !== "number") ? (fetchedCounter[detailUrl] = 0) : (++fetchedCounter[detailUrl]);

		const info = $(elem).contents();

		const time = info.first().text().trim();
		const name = $(elem).children(".accent_color").text();
		const status = info.last().text().trim();
		const detail = (await $(elem).click()).$(`.corner_block_content > ul > li:has() .corner_block_row_detail_d`).eq(fetchedCount).text().trim();

		/** @type {Operation} */
		const operation = { name, status, detail, createdAt: `${date} ${time}` };
		return operation;
	}).get();

	return await Promise.all(operations);
};



(async (req, res) => {
	console.log(await fetchOperations(1));
})();