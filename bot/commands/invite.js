const Discord = require("discord.js");

module.exports = {
    name: 'invite',
    description: 'Invite link!',
    usage: '',
    category: 'Configuration',

    async execute(message, args, client) {
        let invite_embed = await client.embed.sendEmbed({
            title: "Invite Me!",
            desc: "Want to get the latest and greatest news automatically sent to your own personal discord?\nYou can add me by clicking: [here](https://discord.com/api/oauth2/authorize?client_id=815994555543322664&permissions=60480&scope=bot)",
            img: "https://media1.tenor.com/images/2b9988dc00df4b9c67e44aca6eda6430/tenor.gif",
        });

        message.channel.send(invite_embed)
    }
}
