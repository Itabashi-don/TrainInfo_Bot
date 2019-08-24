require("dotenv").config();

require("./../lib/Typedef");
const Mastodon = require("./../lib/Mastodon");



(async () => {
	const mastoClient = await Mastodon.getMastoInstance();
	const statuses = [];

	const operations = (await require("./../api/list")()).data;
	for (let i = 0; i < operations.length; i++) {
		const operation = operations[i];

		statuses[i] = new Promise(resolve => {
			setTimeout(async () => {
				resolve(
					await mastoClient.createStatus({
						status: [
							`◎${operation.name}【${operation.status}】 [${operation.createdAt.split(" ")[1]}]`,
							operation.detail
						].join("\n"),
		
						visibility: "unlisted"
					})
				);
			}, 5000 * i);
		});
	}
	
	console.log(await Promise.all(statuses));
})();