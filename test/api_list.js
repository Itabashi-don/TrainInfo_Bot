require("./../lib/Typedef");
const scrapeClient = require("cheerio-httpcli");



(async () => {
	const $doc = (await scrapeClient.fetch("http://www.jikokuhyo.co.jp/news/list")).$;

	const table = $doc(".corner_block.top_pad");
	const date = table.children(".corner_block_header3").text().trim();

	/** @type {Promise<Operation>[]} */
	const operations = table.find(".corner_block_content > ul > li a").map(async (i, elem) => {
		const info = $doc(elem).contents();

		const time = info.first().text().trim();
		const name = $doc(elem).children(".accent_color").text();
		const status = info.last().text().trim();
		const detail = (await $doc(elem).click()).$(".corner_block_content > ul > li .corner_block_row_detail_d").text().trim();

		/** @type {Operation} */
		const operation = { name, status, detail, createdAt: `${date} ${time}` };
		return operation;
	}).toArray();

	console.log(await Promise.all(operations));
})();