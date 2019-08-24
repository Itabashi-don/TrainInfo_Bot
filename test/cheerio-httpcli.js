const scrapeClient = require("cheerio-httpcli");

(async () => {
	const doc = await scrapeClient.fetch("http://www.jikokuhyo.co.jp/news/list");

	const { $ } = doc;
	const table = $(".corner_block.top_pad");

	const date = table.children(".corner_block_header3").text().trim();
	const operations = table.find(".corner_block_content > ul > li a").map((i, elem) => {
		const operation = $(elem).contents();

		const time = operation.first().text().trim();
		const railway = $(elem).children(".accent_color").text();
		const status = operation.last().text().trim();

		return { railway, status, date: `${date} ${time}` };
	});

	operations.each((i, elem) => console.log(elem));
})();