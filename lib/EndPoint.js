class EndPoint {
	/**
	 * 指定されたデータを返します
	 * 
	 * @template T
	 * 
	 * @param {NowResponse} [res]
	 * @param {number} [statusCode]
	 * @param {T} [data = {}]
	 * 
	 * @return {{ status: "success", data: T }}
	 */
	static returnData (res, statusCode, data = {}) {
		const result = { status: "success", data };

		if (res) {
			if (typeof statusCode === "number") res = res.status(statusCode);
			res.json(result);
		}

		return result;
	}

	/**
	 * 指定されたエラーを返します
	 * 
	 * @template {Error} T
	 * 
	 * @param {NowResponse} [res]
	 * @param {number} [statusCode = 400]
	 * @param {T} error
	 * 
	 * @return {{ status: "failure", error: T }}
	 */
	static returnError (res, statusCode, error) {
		const result = { status: "failure", error: error.message };

		if (res) {
			if (typeof statusCode !== "number") statusCode = 400;
			res.status(statusCode).json(result);
		}

		return result;
	}
}

module.exports = EndPoint;