require("./../lib/Typedef");
const Mastodon = require("./../lib/Mastodon");
const { returnData } = require("./../lib/EndPoint");



/**
 * テストトゥートを行います
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const mastoClient = await Mastodon.getMastoInstance();
	const statuses = [];

	const operations = await require("./list")();
	for (let i = 0; i < operations.length; i++) {
		const operation = operations[i];

		statuses[i] = new Promise(resolve => {
			setTimeout(async () => {
				resolve(
					await mastoClient.createStatus({
						status: [
							`◎${operation.name}【${operation.status}】 [${operation.createdAt}]`,
							operation.detail
						].join("\n"),
		
						visibility: "unlisted"
					})
				);
			}, 5000 * i);
		});
	}

	return returnData(res, null, await Promise.all(statuses));
};