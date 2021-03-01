const Discord = require("discord.js");

module.exports = {
    name: 'setup',
    description: 'Start discord news feed setup.',
    usage: '',
    category: 'Configuration',
    permission: 'ADMINISTRATOR',

    async execute(message, args, client) {
        let newsChannel = null;
        // Error embed is loaded regardless as you are unable to execute
        // the await inside the message await messages event.
        let error_embed = await client.embed.sendEmbed({
            title: "Out of time!",
            desc: "I am an incredibly inpatient bot, please respond to my setup within 30 seconds or ill forget what I was doing!",
            img: "https://media1.tenor.com/images/b278a5a006340b8946457552adec56c5/tenor.gif",
            colour: "#f54242"
        });

        let setup_embed = await client.embed.sendEmbed({
            title: "News Setup",
            desc: "Simply tag the channel that you want me to use in below.\nMake sure I have access to post in the channel or I might break!",
            img: "https://media1.tenor.com/images/59951523dac63102c8d9faacee33535f/tenor.gif"
        });

        message.channel.send(setup_embed).then(() => {
            message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    let response = collected.first().content
                    newsChannel = response.replace(/\D/g,'');

                    client.setup.complete(message, newsChannel);
                })
                .catch(_ => {
                    if (!newsChannel) {
                        message.channel.send(error_embed);
                    }
                });
        });
    }
}
