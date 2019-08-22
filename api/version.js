const package = require("./../package.json");



/**
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = (req, res) => {
	res.json({ version: package.version });
};