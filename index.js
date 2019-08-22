const { Masto } = require("masto");
const { INSTANCE, TOKEN } = process.env;

(async () => {
	const client = await Masto.login({
		uri: INSTANCE,
		accessToken: TOKEN
	});
})();