const { Masto } = require("masto");
const { INSTANCE, TOKEN } = process.env;



/**
 * 環境変数内のオプションを用いてトゥートします
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const client = await Masto.login({
		uri: INSTANCE,
		accessToken: TOKEN
	});

	const status = await client.createStatus({
		status: [
			"This toot was tooted by TrainInfo_Bot."
		].join("\n"),

		visibility: "unlisted"
	});

	res.json(status);
};