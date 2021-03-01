module.exports = (client, guild) => {
    if (!client.servers[guild.id]) {
        client.servers[guild.id] = {
            snowflake: guild.id,
            news_channel: null,
            exludes: null
        }
    };

    var sql = client.con.format('INSERT INTO `servers` (`snowflake`) VALUES (?)', [guild.id]);
    client.con.query(sql);
};