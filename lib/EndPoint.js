class EndPoint {
	/**
	 * 指定されたデータを返します
	 * 
	 * @param {NowResponse} res
	 * @param {number} [statusCode]
	 * @param {*} [data = {}]
	 */
	static returnData (res, statusCode, data = {}) {
		if (typeof statusCode === "number") res = res.status(statusCode);
		return res.json({ status: "success", data });
	}

	/**
	 * 指定されたエラーを返します
	 * 
	 * @param {NowResponse} res
	 * @param {number} [statusCode = 400]
	 * @param {Error} error
	 */
	static returnError (res, statusCode, error) {
		if (typeof statusCode !== "number") statusCode = 400;
		return res.status(statusCode).json({ status: "failure", error });
	}
}

module.exports = EndPoint;