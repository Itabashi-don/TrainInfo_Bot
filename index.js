const Mastodon = require("./lib/Mastodon");



(async () => {
	const client = await Mastodon.getMastoInstance();
	
	console.log("Now index.js is ready!");
})();