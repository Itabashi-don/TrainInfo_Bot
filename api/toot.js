const Mastodon = require("./../lib/Mastodon");



/**
 * テストトゥートを行います
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const client = await Mastodon.getMastoInstance();

	const status = await client.createStatus({
		status: [
			"This toot was tooted by TrainInfo_Bot."
		].join("\n"),

		visibility: "unlisted"
	});

	res.json(status);
};