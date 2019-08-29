const express = require("express");
const Mastodon = require("./lib/Mastodon");



(async () => {
	// const client = await Mastodon.getMastoInstance();

	const app = express();
	app.get("/api/:apiName", (req, res) => require(`./api/${req.params.apiName}`)(req, res));
	app.listen(() => console.log("Now index.js is ready!"));
})();