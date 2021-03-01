const Discord = require("discord.js");

module.exports = (client) => {
    let handler = {};

    handler.new = (data) => {
        return new Promise(async (resolve, reject) => {
            try {

                let news_embed = await client.embed.sendEmbed({
                    title: data.src,
                    desc: data.text+"\n\n[Read the full article here.]("+data.url+")\nYou can invite Discord News to your own [server](https://discord.com/api/oauth2/authorize?client_id=815994555543322664&permissions=60480&scope=bot)!",
                    img: data.img,
                    colour: client.config.post[data.src].colour,
                    thumbnail: client.config.post[data.src].thumbnail,
                });

                // Sending the news article to correct channel
                for (const [guild, server] of Object.entries(client.servers)) {
                    let channel = client.channels.cache.get(server.news_channel)
                    if (channel) {
                        console.log('[NEWS] Sending latest feed to: '+server.news_channel)
                        try {
                            channel.send(news_embed);
                        } catch(e) {
                            console.log(e)
                        }
                    }
                }
            } catch(e) {
                resolve(false);
            }
        });
    }

    return handler;
}