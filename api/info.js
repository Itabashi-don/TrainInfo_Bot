const package = require("./../package.json");

const Mastodon = require("./../lib/Mastodon");
const { returnData } = require("./../lib/EndPoint");



/**
 * TrainInfo_Botのバージョンを返します
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const mastoClient = await Mastodon.getMastoInstance();
	const account = await mastoClient.verifyCredentials();

	const { id, acct, display_name, url } = account;

	return returnData(res, null, {
		version: package.version,
		account: { id, acct, display_name, url }
	});
};