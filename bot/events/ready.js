const web = require(".././utils/web")

module.exports = (client) => {
    console.log(`Bot is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`);
	client.servers = {};

	client.con.query(`SELECT * FROM servers`, (err, rows) => {
		if (err) throw err;
		rows.forEach(function(row) {
			if (!client.servers[row.snowflake]) { client.servers[row.snowflake] = {} }
			client.servers[row.snowflake].news_channel = row.news_channel
		});
	});
    
    client.user.setStatus('online');
	setInterval(function() {
		client.user.setActivity('n!setup | ' + client.guilds.cache.size + " guilds");
	}, 60000)

	client.user.setActivity('n!setup | ' + client.guilds.cache.size + " guilds");

	// Hanging event
	web(client);
}
