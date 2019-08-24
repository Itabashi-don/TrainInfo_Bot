require("dotenv").config();

require("./../lib/Typedef");
const Mastodon = require("./../lib/Mastodon");



(async (req, res) => {
	const mastoClient = await Mastodon.getMastoInstance();
	const statuses = [];

	const operations = (await require("./../api/list")()).data;
	console.log(operations.length < 2 ? `There is ${operations.length || "no"} operation.` : `There are ${operations.length} operations.`);

	for (let i = 0; i < operations.length; i++) {
		const operation = operations[i];

		const { name, status, detail, createdAt } = operation;
		const date = createdAt.split(" ")[1];

		statuses[i] = new Promise(resolve => {
			setTimeout(async () => {
				console.log(`Now posting Operation-${i+1}...`);

				resolve(
					await mastoClient.createStatus({
						status: [
							`【${name}｜${status}】[${date}]`,
							detail
						].join("\n"),
		
						visibility: "unlisted"
					})
				);

				console.log(`Succeeded to post Operation-${i+1}`);
			}, 2000 * (i + 1));
		});
	}

	await Promise.all(statuses);
	console.log("All operations had been informed");
})();