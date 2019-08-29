const scrapeClient = require("cheerio-httpcli");

require("./../lib/Typedef");
const OperationHelper = require("./../lib/OperationHelper");



(async (req, res) => {
	console.log(await OperationHelper.getOperations());
})();