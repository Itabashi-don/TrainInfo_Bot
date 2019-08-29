const express = require("express");

const Mastodon = require("./lib/Mastodon");
const { returnError } = require("./lib/EndPoint");



(async () => {
	// const client = await Mastodon.getMastoInstance();

	const app = express();
	app.set("PORT", process.env.PORT || 5000);

	app.use("/", express.static("./public/"));
	app.get("/api/:apiName", (req, res) => require(`./api/${req.params.apiName}`)(req, res));
	app.post("/api/:apiName", (req, res) => returnError(res, 400, new Error("A POST-Request is not allowed.")));

	app.listen(app.get("PORT"), () => console.log(`Now index.js is ready on port ${app.get("PORT")}!`));
})();