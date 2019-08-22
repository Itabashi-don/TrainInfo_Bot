const package = require("./../package.json");



/**
 * TrainInfo_Botのバージョンを返します
 * 
 * @param {NowRequest} req
 * @param {NowResponse} res
 */
module.exports = (req, res) => {
	res.json({ version: package.version });
};