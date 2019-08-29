const scrapeClient = require("cheerio-httpcli");
require("./Typedef");



class OperationHelper {
	/** 発表中の鉄道運行情報の参照先一覧を返す */
	static async getOperationSources () {
		/** @type {OperationSource[]} */
		let merged = [];

		let sources = [], pageId = 1;
		while ((sources = await OperationHelper._getOperationSourcesInPage(pageId++)).length) merged.push(...sources);

		return merged;
	}

	/**
	 * 発表中の鉄道運行情報の一覧を返す
	 * 
	 * @param {Boolean} [isSimple]
	 * @return {Operation[] | SimpleOperation[]}
	 */
	static async getOperations (isSimple) {
		/** @type {Operation[]} */
		const operations = [];
		/** @type {Object<string, number>} */
		const fetchCounter = {};

		const sources = await OperationHelper.getOperationSources();
		if (isSimple) return sources.map(source => ({ name: source.name, status: source.status, createdAt: source.createdAt }));

		for (const source of sources) {
			const { name, status, url, createdAt } = source;

			const fetchCount = (typeof fetchCounter[url] !== "number") ? (fetchCounter[url] = 0) : (++fetchCounter[url]);
			const detail = (await scrapeClient.fetch(url)).$(`.corner_block_content > ul > li .corner_block_row_detail_d`).eq(fetchCount).text().trim();

			operations.push({ name, status, detail, createdAt });
		}

		return operations;
	}



	/** @param {number} [pageId] */
	static _getSourceUrl (pageId) { return `http://www.jikokuhyo.co.jp/news/list/${pageId ? `page/${pageId}` : ""}` }

	/** @param {number} [pageId] */
	static async _getOperationSourcesInPage (pageId) {
		const { $ } = await scrapeClient.fetch(OperationHelper._getSourceUrl(pageId));

		const table = $(".corner_block.top_pad");
		const date = table.children(".corner_block_header3").text().trim();

		/** @type {OperationSource[]} */
		const sources = table.find(".corner_block_content > ul > li a").map((i, elem) => {
			const url = $(elem).url();
			const info = $(elem).contents();

			const time = info.first().text().trim();
			const name = $(elem).children(".accent_color").text();
			const status = info.last().text().trim();

			/** @type {OperationSource} */
			const source = { name, status, url, createdAt: `${date} ${time}` };
			return source;
		}).get();

		return await Promise.all(sources);
	}
}

module.exports = OperationHelper;