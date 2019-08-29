const express = require("express");
const Mastodon = require("./lib/Mastodon");



(async () => {
	// const client = await Mastodon.getMastoInstance();

	const app = express();
	app.set("PORT", process.env.PORT || 5000);
	app.get("/api/:apiName", (req, res) => require(`./api/${req.params.apiName}`)(req, res));

	app.listen(app.get("PORT"), () => console.log(`Now index.js is ready on port ${app.get("PORT")}!`));
})();