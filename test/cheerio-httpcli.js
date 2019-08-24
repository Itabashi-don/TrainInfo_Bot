const scrapeClient = require("cheerio-httpcli");

(async () => {
	const doc = await scrapeClient.fetch("http://www.jikokuhyo.co.jp/news/list");

	const { $ } = doc;
	const table = $(".corner_block.top_pad");

	const date = table.children(".corner_block_header3").text().trim();
	const railways = table.find(".corner_block_content > ul > li").map((i, elem) => $(elem).find("div > a"));

	railways.each((i, elem) => {
		const operation = $(elem).contents();

		const time = operation.first().text().trim();
		const railwayName = $(elem).children(".accent_color").text();
		const status = operation.last().text().trim();

		console.log([
			`${date} ${time} ${railwayName} ${status}`
		].join("\n"));
	});
})();