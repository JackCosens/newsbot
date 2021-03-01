const Discord = require("discord.js");

module.exports = (client) => {
    let handler = {};

    handler.complete = (message, id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let channel = client.channels.fetch(id);
                if (channel) {
                    let success_embed = await client.embed.sendEmbed({
                        title: "Setup Completed!",
                        desc: "Congratulations! The setup is now complete.\nWhen I detect an article from our curated list I will post it to: <#"+id+">",
                        img: "https://media1.tenor.com/images/cc952f1b56405d01532c763deaf33ef9/tenor.gif",
                        colour: "#42f56f"
                    });
                    message.channel.send(success_embed);

                    
                    var sql = client.con.format('INSERT INTO `servers` (`snowflake`, `news_channel`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `news_channel`=?', [message.guild.id, id, id]);
                    client.con.query(sql);

                    if (!client.servers[message.guild.id]) { client.servers[message.guild.id] = {} }
                    client.servers[message.guild.id].news_channel = id

                    resolve(true);
                } else {
                    let error_embed = await client.embed.sendEmbed({
                        title: "Unable to find channel!",
                        desc: "The channel you have tagged, does not exist or I am unable to view.\nPlease try the setup again.",
                        img: "https://media1.tenor.com/images/628749cf0795d197fdc7b1f48ee589ab/tenor.gif",
                        colour: "#f54242"
                    });
                    message.channel.send(error_embed);

                    resolve(false);
                }
                
                
            } catch(e) {
                resolve(false);
            }
        });
    }

    return handler;
}