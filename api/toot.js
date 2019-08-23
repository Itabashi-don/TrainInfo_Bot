const { Masto } = require("masto");
const { INSTANCE, TOKEN } = process.env;



/**
 * テストトゥートを行います
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