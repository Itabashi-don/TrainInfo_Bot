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

	const status = await mastoClient.createStatus({
		status: [
			"This toot was tooted by TrainInfo_Bot."
		].join("\n"),

		visibility: "unlisted"
	});

	return returnData(res, null, status);
};