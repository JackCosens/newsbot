const Discord = require("discord.js");

module.exports = (client) => {
    let handler = {};

    handler.sendEmbed = (data) => {
        return new Promise(async (resolve, reject) => {
            try {

                const messageEmbed = new Discord.MessageEmbed()
                    .setColor((data.colour) ? data.colour : '#4287f5')
                    .setTitle((data.title) ? data.title : 'Title')
                    .setURL(data.url)
                    .setDescription((data.desc) ? data.desc : 'Description')
                    
                    .setImage(data.img)
                    .setThumbnail(data.thumbnail)
                    .setTimestamp()
                    .setFooter('Discord News', 'https://i.imgur.com/XwYvA8e.png');

                resolve(messageEmbed);
            } catch(e) {
                resolve(false);
            }
        });
    }

    return handler;
}