const Mastodon = require("./lib/Mastodon");
const cron = require("node-cron");

(async () => {
	const client = await Mastodon.getMastoInstance();
	
	console.log("Now index.js is ready!");
})();