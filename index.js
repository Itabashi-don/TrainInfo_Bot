const { Masto } = require("masto");
const cron = require("node-cron");

const { INSTANCE, TOKEN } = process.env;

(async () => {
	const client = await Masto.login({
		uri: INSTANCE,
		accessToken: TOKEN
	});

	cron.schedule("* * * * *", () => {
		console.log("Running a scheduled task...");

		/*client.createStatus({
			status: "This is tooted by scheduled task on TrainInfo_Bot.",
			visibility: "unlisted"
		});*/
	});
})();