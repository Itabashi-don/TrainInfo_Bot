const Mastodon = require("./../lib/Mastodon");
const { returnData } = require("./../lib/EndPoint");

const package = require("./../package.json");



/**
 * TrainInfo_Botのバージョンを返します
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = async (req, res) => {
	const client = await Mastodon.getMastoInstance();
	const account = await client.verifyCredentials();

	const { id, acct, display_name, url } = account;

	return returnData(res, null, {
		version: package.version,
		account: { id, acct, display_name, url }
	});
};