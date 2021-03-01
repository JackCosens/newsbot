module.exports = (client, message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = client.config.bot.prefix

    if (message.content.indexOf(client.config.bot.prefix) !== 0) return;


    // Command Handeling Logic
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Check if user has valid permission to execute command
    if (command.permission) {
        if (!message.member.hasPermission(command.permission)) {
            return message.reply('You do not have permission to use this command.');
        }
    }

    // Executing the Command
    try {
        command.execute(message , args , client)
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
}
